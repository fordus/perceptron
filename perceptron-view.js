import { perceptron, checkPerceptron } from './n-perceptrons.js'
import {
  createBinaryData,
  addBias,
  getNumbersByPertentage
} from './generate-data-functions.js'

import {
  checkThreeOnes,
  checkMoreThanFourOnes,
  checkLessThanFiveOnes
} from './solutions.js'

/**
 * DOM elements
 */
const $epochs = document.querySelector('#epochs')
const $learningRate = document.querySelector('#learning-rate')
const $inputData = document.querySelector('#input-data')
const $desiredOutput = document.querySelector('#desired-output')
const $weights = document.querySelector('#weights')
const $output = document.querySelector('#output')
const $resultWeights = document.querySelector('#result-weights')
const $clearData = document.querySelector('#clear-data')
const $trainPerceptron = document.querySelector('#train-perceptron')
const $performance = document.querySelector('#performance')

const $dataSize = document.querySelector('#data-size')
const $Operation = document.querySelector('#operation')
const $percentage = document.querySelector('#percentage')
const $inputDataTraining = document.querySelector('#input-data-training')
const $desiredOutputTraining = document.querySelector(
  '#desired-output-training'
)
const $weightsTraining = document.querySelector('#weights-training')
const $inputDataChecking = document.querySelector('#input-data-check')
const $desiredOutputChecking = document.querySelector('#desired-output-check')
const $generateData = document.querySelector('#generate-data')

/**
 * Clear data event listener
 */
$clearData.addEventListener('click', () => {
  $inputData.value = ''
  $desiredOutput.value = ''
  $weights.value = ''
  $output.value = ''
  $resultWeights.value = ''
})

/**
 * Constants
 */
const LEARNING_RATE = 0.5
const EPOCHS = 20
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
const WEIGHTS = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
]
const DESIRED_OUTPUT = [
  [0, 1],
  [1, 0],
  [0, 1],
  [1, 0],
  [0, 1],
  [1, 0],
  [0, 1],
  [1, 0],
  [0, 1],
  [1, 0]
]

const DATA_LENGTH = 7
const PERCENTAGE = 0.2

/**
 * Initializes the values of the input fields with the predefined values.
 */
function initializeValues () {
  $epochs.value = EPOCHS
  $learningRate.value = LEARNING_RATE
  $inputData.value = VALUES.map(value => value.join(' ')).join('\n')
  $desiredOutput.value = DESIRED_OUTPUT.map(value => value.join(' ')).join('\n')
  $weights.value = WEIGHTS.map(value => value.join(' ')).join('\n')
  $dataSize.value = DATA_LENGTH
  $percentage.value = PERCENTAGE
}

initializeValues()

/**
 * Trains the perceptron with the values entered by the user.
 */
$trainPerceptron.addEventListener('click', () => {
  const t0 = performance.now() // start time
  const epochs = parseInt($epochs.value)
  const learningRate = parseFloat($learningRate.value)
  const values = $inputData.value
    .split('\n')
    .map(value => value.split(' ').map(Number))
  const desiredOutput = $desiredOutput.value
    .split('\n')
    .map(value => value.split(' ').map(Number))
  const weights = $weights.value
    .split('\n')
    .map(value => value.split(' ').map(Number))

  const weightsTrained = perceptron(
    values,
    weights,
    desiredOutput,
    epochs,
    learningRate
  )
  $resultWeights.value = weightsTrained.map(value => value.join(' ')).join('\n')
  const output = checkPerceptron(values, weightsTrained, desiredOutput)
  $output.value = output
  const t1 = performance.now() // end time
  $performance.value = `${t1 - t0} ms`
})

$generateData.addEventListener('click', () => {
  $Operation.style.border = '1px solid #ced4da'
  $dataSize.style.border = '1px solid #ced4da'
  $percentage.style.border = '1px solid #ced4da'
  if ($Operation.value === '0') {
    $Operation.style.border = '1px solid red'
    return
  }

  if (parseInt($dataSize.value) < 1) {
    $dataSize.style.border = '1px solid red'
    return
  }

  if (parseFloat($percentage.value) < 0 || parseFloat($percentage.value) > 1) {
    $percentage.style.border = '1px solid red'
    return
  }

  console.log('Generating data with the following parameters:')
  console.log('Operation:', $Operation.value)
  console.log('Data size:', $dataSize.value)
  console.log('Percentage:', $percentage.value)

  const matrix = createBinaryData(parseInt($dataSize.value))
  const matrixBias = addBias(matrix)

  const {
    trainingData,
    traininDataDesiredValues,
    testingData,
    testingDesiredValues
  } = getNumbersByPertentage(
    matrixBias,
    $Operation.value === '1'
      ? checkThreeOnes(matrix)
      : $Operation.value === '2'
      ? checkMoreThanFourOnes(matrix)
      : checkLessThanFiveOnes(matrix),
    parseFloat($percentage.value)
  )

  $inputDataTraining.value = trainingData
    .map(value => value.join(' '))
    .join('\n')
  $desiredOutputTraining.value = traininDataDesiredValues
    .map(value => value.join(' '))
    .join('\n')
  $weightsTraining.value = trainingData[0].map(() => 0).join(' ')

  $inputDataChecking.value = testingData
    .map(value => value.join(' '))
    .join('\n')

  $desiredOutputChecking.value = testingDesiredValues
    .map(value => value.join(' '))
    .join('\n')
})
