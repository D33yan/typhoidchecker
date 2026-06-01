import numpy as np
import pandas as pd

def generate_synthetic_data(num_samples=2000, seed=42):
    np.random.seed(seed)
    
    # 1. Age (between 1 and 80)
    age = np.random.randint(1, 80, size=num_samples)
    
    # 2. RecentTravel to endemic areas (probability of 20%)
    recent_travel = np.random.choice([0, 1], size=num_samples, p=[0.8, 0.2])
    
    # 3. PreviousHistory of typhoid (probability of 15%)
    previous_history = np.random.choice([0, 1], size=num_samples, p=[0.85, 0.15])
    
    # Symptoms (Fever is extremely common in active cases; others vary)
    # 4. Fever (probability of 40% in general symptomatic population)
    fever = np.random.choice([0, 1], size=num_samples, p=[0.6, 0.4])
    
    # 5. Headache (probability of 50%)
    headache = np.random.choice([0, 1], size=num_samples, p=[0.5, 0.5])
    
    # 6. AbdominalPain (probability of 30%)
    abdominal_pain = np.random.choice([0, 1], size=num_samples, p=[0.7, 0.3])
    
    # 7. Weakness and fatigue (probability of 45%)
    weakness = np.random.choice([0, 1], size=num_samples, p=[0.55, 0.45])
    
    # Calculate probability of having Typhoid based on clinical logic
    # Base probability
    p = np.zeros(num_samples) + 0.05
    
    # Add clinical weightings
    p += fever * 0.35            # Fever is the primary indicator
    p += recent_travel * 0.25     # Travel to endemic areas is a high risk factor
    p += abdominal_pain * 0.15    # Gastrointestinal symptoms are strong indicators
    p += weakness * 0.10          # General systemic indicators
    p += headache * 0.05          # Common but less specific symptom
    p += previous_history * 0.05  # Relapse or carrier potential
    
    # Age factor: young children (< 10) and elderly (> 65) have slightly higher susceptibility
    age_risk = np.where((age < 10) | (age > 65), 0.05, 0.0)
    p += age_risk
    
    # Clip probability between 0.02 and 0.98 to introduce natural noise
    p = np.clip(p, 0.02, 0.98)
    
    # Generate binary Typhoid outcome based on probability
    typhoid = np.random.binomial(1, p)
    
    # Create DataFrame
    df = pd.DataFrame({
        "Age": age,
        "RecentTravel": recent_travel,
        "PreviousHistory": previous_history,
        "Fever": fever,
        "Headache": headache,
        "AbdominalPain": abdominal_pain,
        "Weakness": weakness,
        "Typhoid": typhoid
    })
    
    df.to_csv("synthetic_typhoid_dataset.csv", index=False)
    print(f"Generated synthetic dataset with {num_samples} samples and saved as synthetic_typhoid_dataset.csv")

if __name__ == "__main__":
    generate_synthetic_data()
