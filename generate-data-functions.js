import { perceptron, checkPerceptron } from './n-perceptrons.js'

export function createBinaryData (length) {
  let matrix = []
  for (let i = 0; i < Math.pow(2, length); i++) {
    let binary = i.toString(2).padStart(length, '0')
    const values = binary.split('').map(Number)
    matrix.push([...values])
  }

  return matrix
}

// add bias to the matrix
export function addBias (matrix) {
  return matrix.map(row => [1, ...row])
}

// get random numbers based on percentage
export function getNumbersByPertentage (data, desiredValues, percentage) {
  const trainingData = [...data]
  const traininDataDesiredValues = [...desiredValues]
  const testingData = []
  const testingDesiredValues = []

  const testingSize = Math.round(percentage * trainingData.length)

  while (testingData.length < testingSize) {
    const index = Math.floor(Math.random() * trainingData.length)
    testingData.push(trainingData[index])
    testingDesiredValues.push(traininDataDesiredValues[index])
    trainingData.splice(index, 1)
    traininDataDesiredValues.splice(index, 1)
  }

  return {
    trainingData,
    traininDataDesiredValues,
    testingData,
    testingDesiredValues
  }
}

export function runPerceptron ({
  dataLength,
  percentage,
  epochs,
  learningRate,
  operation
}) {
  const DATA = createBinaryData(dataLength)
  const DATA_BIAS = addBias(DATA)
  const DESIRED_VALUES = operation(DATA)
  const WEIGHTS = [DATA_BIAS[0].map(() => 0)]

  const {
    trainingData,
    traininDataDesiredValues,
    testingData,
    testingDesiredValues
  } = getNumbersByPertentage(DATA_BIAS, DESIRED_VALUES, percentage)

  const weights = perceptron(
    trainingData,
    WEIGHTS,
    traininDataDesiredValues,
    epochs,
    learningRate
  )

  console.log('Weights trained:', weights)
  const output = checkPerceptron(testingData, weights, testingDesiredValues)
  console.log(output)
}
