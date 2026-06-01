import modelParams from "../public/model_parameters.json";

interface ScalerParams {
  mean: number[];
  scale: number[];
  features: string[];
}

interface LayerParams {
  name: string;
  weights: number[][]; // [input_dim][output_dim]
  biases: number[];    // [output_dim]
  activation: string;
}

interface ModelParams {
  scaler: ScalerParams;
  layers: LayerParams[];
}

// Relu Activation
function relu(x: number): number {
  return Math.max(0, x);
}

// Sigmoid Activation
function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

// Dense Layer Forward Pass
function forwardDense(input: number[], layer: LayerParams): number[] {
  const { weights, biases, activation } = layer;
  const numInputs = weights.length;
  const numOutputs = weights[0].length;
  
  const output: number[] = new Array(numOutputs).fill(0);
  
  for (let j = 0; j < numOutputs; j++) {
    let sum = biases[j];
    for (let i = 0; i < numInputs; i++) {
      sum += input[i] * weights[i][j];
    }
    
    // Apply activation
    if (activation === "relu") {
      output[j] = relu(sum);
    } else if (activation === "sigmoid") {
      output[j] = sigmoid(sum);
    } else {
      output[j] = sum; // Linear activation
    }
  }
  
  return output;
}

export interface TyphoidPredictionInput {
  age: number;
  recentTravel: boolean;
  previousHistory: boolean;
  fever: boolean;
  headache: boolean;
  abdominalPain: boolean;
  weakness: boolean;
}

/**
 * Predicts the probability of typhoid using the zero-dependency neural network forward pass.
 * @param inputs Clinical risk factors and symptoms
 * @returns typhoid probability percentage (0 to 100)
 */
export function predictTyphoid(inputs: TyphoidPredictionInput): number {
  const params = modelParams as ModelParams;
  const { mean, scale } = params.scaler;
  
  // 1. Map input fields to feature array in the EXACT order defined during training
  // Order: Age, RecentTravel, PreviousHistory, Fever, Headache, AbdominalPain, Weakness
  const rawFeatures: number[] = [
    inputs.age,
    inputs.recentTravel ? 1 : 0,
    inputs.previousHistory ? 1 : 0,
    inputs.fever ? 1 : 0,
    inputs.headache ? 1 : 0,
    inputs.abdominalPain ? 1 : 0,
    inputs.weakness ? 1 : 0
  ];
  
  // 2. Apply StandardScaler: (x - mean) / std_dev
  const scaledFeatures = rawFeatures.map((val, idx) => {
    return (val - mean[idx]) / scale[idx];
  });
  
  // 3. Sequential Neural Network Forward Pass
  let currentActivation = scaledFeatures;
  for (const layer of params.layers) {
    currentActivation = forwardDense(currentActivation, layer);
  }
  
  // 4. Return probability as a percentage rounded to 1 decimal place
  // The final layer has exactly 1 output (sigmoid probability between 0 and 1)
  const probability = currentActivation[0];
  return Math.round(probability * 1000) / 10;
}
