import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow import keras
import json
import os

# Load Dataset
df = pd.read_csv("synthetic_typhoid_dataset.csv")

# Split Features & Target
# Ensure features are in the exact order: Age, RecentTravel, PreviousHistory, Fever, Headache, AbdominalPain, Weakness
feature_cols = ["Age", "RecentTravel", "PreviousHistory", "Fever", "Headache", "AbdominalPain", "Weakness"]
X = df[feature_cols]
y = df["Typhoid"]

# Train-Test Split (80-20)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature Scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Define Neural Network Model
model = keras.Sequential([
    keras.layers.Dense(32, activation='relu', input_shape=(X_train.shape[1],)),
    keras.layers.Dropout(0.3),  # Prevent overfitting
    keras.layers.Dense(16, activation='relu'),
    keras.layers.Dense(1, activation='sigmoid')  # Binary classification
])

# Compile Model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Add Early Stopping
early_stopping = keras.callbacks.EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)

# Train Model
model.fit(X_train, y_train, epochs=50, validation_data=(X_test, y_test), callbacks=[early_stopping])

# Evaluate Model
loss, accuracy = model.evaluate(X_test, y_test)
print(f"Model Accuracy: {accuracy * 100:.2f}%")

# Save Model
model.save("typhoid_model.h5")
print("Model saved as typhoid_model.h5")

# Ensure public directory exists
os.makedirs("public", exist_ok=True)

# Save weights and scaler parameters for TypeScript inference
export_data = {
    "scaler": {
        "mean": scaler.mean_.tolist(),
        "scale": scaler.scale_.tolist(),
        "features": feature_cols
    },
    "layers": []
}

for layer in model.layers:
    weights_list = layer.get_weights()
    if len(weights_list) == 2:
        w, b = weights_list
        export_data["layers"].append({
            "name": layer.name,
            "weights": w.tolist(),  # List of list of shape (inputs, outputs)
            "biases": b.tolist(),   # List of shape (outputs,)
            "activation": layer.activation.__name__ if hasattr(layer, 'activation') else 'linear'
        })

with open("public/model_parameters.json", "w") as f:
    json.dump(export_data, f, indent=2)
print("Model parameters and scaler exported successfully to public/model_parameters.json")
