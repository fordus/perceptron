import {
  innerProduct,
  multiplyVectorByScalar,
  sumVectors,
  activationFunction
} from './vector-operations.js'

/**
 * Calculates the output of a perceptron given the input values and weights.
 *
 * @param {number[]} values - The input values.
 * @param {number[][]} weights - The weights of the perceptron.
 * @returns {number[]} - The calculated output values.
 */
function calculateOutput (values, weights) {
  return weights.map(weight => activationFunction(innerProduct(values, weight)))
}

/**
 * Calculates the error between the desired output and the actual output.
 *
 * @param {Array} desiredValue - The desired output values.
 * @param {Array} output - The actual output values.
 * @returns {Array} - The error values for each output neuron.
 */
function calculateError (desiredValue, output) {
  // console.log('desiredValue:', desiredValue)
  return desiredValue.map((value, index) => value - output[index])
}

/**
 * Trains the perceptron by adjusting the weights based on the input values and desired output values.
 *
 * @param {Array<Array<number>>} values - The input values for training.
 * @param {Array<Array<number>>} weights - The initial weights.
 * @param {Array<number>} desiredValues - The desired output values for training.
 * @returns {Array<Array<number>>} - The updated weights after training.
 */
function training (values, weights, desiredValues, learningRate) {
  let actualWeights = weights

  values.forEach((value, index) => {
    const actualDesiredValue = desiredValues[index]
    const output = calculateOutput(value, weights)

    const errors = calculateError(actualDesiredValue, output)

    const deltas = errors.map((error, i) =>
      multiplyVectorByScalar(value, learningRate * error)
    )

    actualWeights = actualWeights.map((weight, i) =>
      sumVectors(weight, deltas[i])
    )
  })

  return actualWeights
}

/**
 * Performs the perceptron algorithm to train the weights based on the given values and desired values.
 *
 * @param {number[]} values - The input values.
 * @param {number[]} weights - The initial weights.
 * @param {number[]} desiredValues - The desired output values.
 * @returns {number[]} - The updated weights after training.
 */
export function perceptron (
  values,
  weights,
  desiredValues,
  epochs,
  learningRate
) {
  let actualWeights = weights

  for (let i = 0; i < epochs; i++) {
    actualWeights = training(values, actualWeights, desiredValues, learningRate)
    // console.log({
    //   epoch: i + 1,
    //   weights: actualWeights
    // })
  }

  return actualWeights
}

/**
 * Checks the perceptron by calculating the output for each input value and comparing it with the desired output.
 *
 * @param {Array} values - The input values.
 * @param {Array} weights - The weights for each input value.
 * @param {Array} desiredValues - The desired output values for each input value.
 */
export function checkPerceptron (values, weights, desiredValues) {
  let output = []
  console.log('Calculated weights:', weights)
  values.forEach(value => {
    output =
      output +
      `Input: [${value}] Output: [${calculateOutput(value, weights).join(
        ' '
      )}] Desired: [${desiredValues[values.indexOf(value)].join(',')}]\n`
  })
  return output
}
// ---------------------------- Separate points ----------------------------
// EXAMPLE WITH TWO NEURONS

// const LEARNING_RATE = 0.5
// const VALUES = [
//   [1, 0, 0],
//   [1, 0, 1],
//   [1, 1, 0],
//   [1, 1, 1]
// ]

// const weights = [
//   [0, 0, 0],
//   [0, 0, 0]
// ]

// const desiredOutput = [
//   [1, 0],
//   [1, 1],
//   [1, 1],
//   [0, 1]
// ]

// const weightsTrained = perceptron(VALUES, weights, desiredOutput)
// console.log('Weights trained:', weightsTrained)
// checkPerceptron(VALUES, weightsTrained, desiredOutput)

// ---------------------------- screen numbers of 7 segments ----------------------------

// const LEARNING_RATE = 0.5
// const VALUES = [
//   [1, 0, 1, 1, 0, 0, 0, 0],
//   [1, 1, 1, 0, 1, 1, 0, 0],
//   [1, 1, 1, 1, 1, 0, 0, 1],
//   [1, 0, 1, 1, 0, 0, 1, 1],
//   [1, 1, 0, 1, 1, 0, 1, 1],
//   [1, 1, 0, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 0, 0, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1, 0]
// ]

// const WEIGHTS = [[0, 0, 0, 0, 0, 0, 0, 0]]

// const DESIRED_OUTPUT = [[0], [1], [0], [1], [0], [1], [0], [1], [0], [1]]

// const weights = perceptron(VALUES, WEIGHTS, DESIRED_OUTPUT)
// checkPerceptron(VALUES, weights, DESIRED_OUTPUT)
