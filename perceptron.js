// EXAMPLE WITH ONE NEURON

/**
 * This function takes a value and returns 1 if the value is greater than or equal to 0, otherwise it returns 0.
 * @param {number} value - The value to be checked.
 * @returns {number} - 1 if the value is greater than or equal to 0, 0 otherwise.
 */
function activationFunction (value) {
  return value >= 0 ? 1 : 0
}
// activationFunction(0) -> 1

/**
 * Calculates the inner product of two arrays.
 *
 * @param {number[]} values - The array of values.
 * @param {number[]} weights - The array of weights.
 * @returns {number} The inner product of the two arrays.
 */
function innerProduct (values, weights) {
  let sum = 0
  for (let i = 0; i < values.length; i++) {
    sum += values[i] * weights[i]
  }
  return sum
}
// innerProduct([2, 2, 2], [1, 1, 1]) -> 6

/**
 * Multiplies each element of a vector by a scalar.
 *
 * @param {number[]} vector - The vector to be multiplied.
 * @param {number} scalar - The scalar value to multiply the vector by.
 * @returns {number[]} The resulting vector after multiplication.
 */
function multiplyVectorByScalar (vector, scalar) {
  return vector.map(value => value * scalar)
}
// multiplyVectorByScalar([1, 2, 3], 2) -> [2, 4, 6]

function calculateOutput (values, weights) {
  return activationFunction(innerProduct(values, weights))
}
// calculateOutput([1, 1, 1], [1, 1, 1]) -> 1

function sumVectors (vector1, vector2) {
  return vector1.map((value, index) => value + vector2[index])
}
// sumVectors([1, 2, 3], [4, 5, 6]) -> [5, 7, 9]

function calculateError (desiredValue, output) {
  return desiredValue - output
}
// if desired: 1 and output: 0 -> error = 1
// if desired: 0 and output: 1 -> error = -1

/**
 * Trains the model by adjusting the weights based on the given values and desired values.
 * @param {Array<number>} values - The input values.
 * @param {Array<number>} weights - The initial weights.
 * @param {Array<number>} desiredValue - The desired output values.
 * @returns {Array<number>} - The updated weights after training.
 */
function training (values, weights, desiredValues) {
  let actualWeights = weights

  values.forEach((_value, index) => {
    const ActualDesiredValue = desiredValues[index]
    const output = calculateOutput(values[index], weights)

    if (ActualDesiredValue === output) return // if the output is correct, do not change the weights

    const error = calculateError(ActualDesiredValue, output)
    const delta = multiplyVectorByScalar(values[index], LEARNING_RATE * error)

    actualWeights = sumVectors(actualWeights, delta)
  })

  return actualWeights
}

function perceptron (values, weights, desiredValues) {
  let actualWeights = weights

  // number of epochs
  const epochs = 50
  for (let i = 0; i < epochs; i++) {
    actualWeights = training(values, actualWeights, desiredValues)
    console.log({
      epoch: i + 1,
      weights: actualWeights
    })
  }

  return actualWeights
}

function checkPerceptron (values, weights, desiredValues) {
  console.log('Calculated weights:', weights)
  values.forEach(value => {
    console.log(
      `Input: ${value}, Output: ${calculateOutput(value, weights)}, Desired: ${
        desiredValues[values.indexOf(value)]
      }`
    )
  })
}

// ---------------------------- Separate points ----------------------------

// const VALUES = [
//   [1, 1, 1],
//   [1, 1, 2],
//   [1, 1.5, 1],
//   [1, 2, 2]
// ]
// const WEIGHTS = [0, 0, 0]
// const DESIRED_OUTPUT = [1, 1, 0, 0]
// const LEARNING_RATE = 1

// const weights = perceptron(VALUES, WEIGHTS, DESIRED_OUTPUT)
// checkPerceptron(VALUES, weights, DESIRED_OUTPUT)

// ---------------------------- screen numbers of 7 segments ----------------------------
const VALUES = [
  [1, 0, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 1, 1],
  [1, 1, 0, 1, 1, 0, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 0]
]
const DESIRED_OUTPUT = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
const WEIGHTS = [0, 0, 0, 0, 0, 0, 0, 0]
const LEARNING_RATE = 1
const weights = perceptron(VALUES, WEIGHTS, DESIRED_OUTPUT)
checkPerceptron(VALUES, weights, DESIRED_OUTPUT)

// ---------------------------- XOR problem ----------------------------

// const VALUES = [
//   [1, 1, 1],
//   [1, 1, 0],
//   [1, 0, 1],
//   [1, 0, 0]
// ]

// const DESIRED_OUTPUT = [0, 1, 1, 0]
// const WEIGHTS = [1, 0, 0]
// const LEARNING_RATE = 0.5

// const weights = perceptron(VALUES, WEIGHTS, DESIRED_OUTPUT)
// checkPerceptron(VALUES, weights, DESIRED_OUTPUT)

// n PERCEPTRONS
