/**
 * This function takes a value and returns 1 if the value is greater than or equal to 0, otherwise it returns 0.
 * @param {number} value - The value to be checked.
 * @returns {number} - 1 if the value is greater than or equal to 0, 0 otherwise.
 */
function activationFunction (value) {
  return value >= 0 ? 1 : 0
}

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

/**
 * Calculates the output of two perceptrons based on the given values and weights.
 *
 * @param {number[]} values - The input values.
 * @param {number[][]} weights - The weights for each perceptron.
 * @returns {number[]} - The output values of the two perceptrons.
 */
function calculateOutput (values, weights) {
  return [
    activationFunction(innerProduct(values, weights[0])),
    activationFunction(innerProduct(values, weights[1]))
  ]
}

/**
 * Sums two vectors element-wise.
 *
 * @param {number[]} vector1 - The first vector.
 * @param {number[]} vector2 - The second vector.
 * @returns {number[]} The resulting vector after summing the two input vectors.
 */
function sumVectors (vector1, vector2) {
  return vector1.map((value, index) => value + vector2[index])
}

/**
 * Calculates the error between the desired value and the output.
 *
 * @param {number[]} desiredValue - The desired value.
 * @param {number[]} output - The output value.
 * @returns {number[]} The error between the desired value and the output.
 */
function calculateError (desiredValue, output) {
  return [desiredValue[0] - output[0], desiredValue[1] - output[1]]
}

/**
 * Trains the model by adjusting the weights based on the given values and desired values.
 * @param {Array<number>} values - The input values.
 * @param {Array<number[]>} weights - The initial weights for each neuron.
 * @param {Array<number[]>} desiredValue - The desired output values for each neuron.
 * @returns {Array<number[]>} - The updated weights after training for each neuron.
 */
function training (values, weights, desiredValues) {
  let actualWeights = weights

  values.forEach((_value, index) => {
    const actualDesiredValue = desiredValues[index]
    const output = calculateOutput(values[index], weights)

    const errors = calculateError(actualDesiredValue, output)

    const deltas = errors.map((error, i) =>
      multiplyVectorByScalar(values[index], LEARNING_RATE * error)
    )

    actualWeights = actualWeights.map((weight, i) =>
      sumVectors(weight, deltas[i])
    )
  })

  return actualWeights
}

function perceptron (values, weights, desiredValues) {
  let actualWeights = weights

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
      `Input: ${value}, Output: [${calculateOutput(value, weights).join(
        ', '
      )}], Desired: [${desiredValues[values.indexOf(value)].join(', ')}]`
    )
  })
}

// ---------------------------- Separate points ----------------------------
// EXAMPLE WITH TWO NEURONS

const LEARNING_RATE = 0.5
const VALUES = [
  [1, 0, 0],
  [1, 0, 1],
  [1, 1, 0],
  [1, 1, 1]
]

const weights = [
  [0, 0, 0],
  [0, 0, 0]
]

const desiredOutput = [
  [1, 0],
  [1, 1],
  [1, 1],
  [0, 1]
]

const weightsTrained = perceptron(VALUES, weights, desiredOutput)
console.log('Weights trained:', weightsTrained)
checkPerceptron(VALUES, weightsTrained, desiredOutput)
