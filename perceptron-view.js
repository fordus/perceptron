import { perceptron, checkPerceptron } from './n-perceptrons.js'

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

/**
 * Initializes the values of the input fields with the predefined values.
 */
function initializeValues () {
  $epochs.value = EPOCHS
  $learningRate.value = LEARNING_RATE
  $inputData.value = VALUES.map(value => value.join(' ')).join('\n')
  $desiredOutput.value = DESIRED_OUTPUT.map(value => value.join(' ')).join('\n')
  $weights.value = WEIGHTS.map(value => value.join(' ')).join('\n')
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
