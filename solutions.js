import { runPerceptron } from './generate-data-functions.js'

// check which has exactly three 1s, add 0 if not and 1 if yes
export function checkThreeOnes (matrix) {
  const indexWithThreeOnes = []
  matrix.forEach((row, index) => {
    if (row.filter(value => value === 1).length === 3) {
      indexWithThreeOnes.push(1)
      return
    }
    indexWithThreeOnes.push(0)
  })

  return indexWithThreeOnes.map(value => [value])
}

// check which has more than four 1s, add 0 if not and 1 if yes
export function checkMoreThanFourOnes (matrix) {
  const indexWithMoreThanFourOnes = []
  matrix.forEach((row, index) => {
    if (row.filter(value => value === 1).length > 4) {
      indexWithMoreThanFourOnes.push(1)
      return
    }
    indexWithMoreThanFourOnes.push(0)
  })

  return indexWithMoreThanFourOnes.map(value => [value])
}

// check which has less than five 1s, add 0 if not and 1 if yes
export function checkLessThanFiveOnes (matrix) {
  const indexWithLessThanFiveOnes = []
  matrix.forEach((row, index) => {
    if (row.filter(value => value === 1).length < 5) {
      indexWithLessThanFiveOnes.push(1)
      return
    }
    indexWithLessThanFiveOnes.push(0)
  })

  return indexWithLessThanFiveOnes.map(value => [value])
}

const exactlyThreeOnes = {
  dataLength: 6,
  percentage: 0.2,
  epochs: 50,
  learningRate: 1,
  operation: checkThreeOnes
}

const moreThanFourOnes = {
  dataLength: 6,
  percentage: 0.2,
  epochs: 50,
  learningRate: 1,
  operation: checkMoreThanFourOnes
}

const lessThanFiveOnes = {
  dataLength: 6,
  percentage: 0.2,
  epochs: 50,
  learningRate: 1,
  operation: checkLessThanFiveOnes
}

// runPerceptron(lessThanFiveOnes)
