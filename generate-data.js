let values = [0, 0, 0, 0, 0, 0, 0]
let matrix = []

for (let i = 0; i < Math.pow(2, values.length); i++) {
  let binary = i.toString(2).padStart(values.length, '0')
  values = binary.split('').map(Number)
  matrix.push([...values])
}

console.log(matrix)

// check which has exactly three 1s, add 0 if not and 1 if yes

const indexWithThreeOnes = []
matrix.forEach((row, index) => {
  if (row.filter(value => value === 1).length === 3) {
    indexWithThreeOnes.push(1)
    return
  }
  indexWithThreeOnes.push(0)
})

console.log(indexWithThreeOnes)

// check which has more than four 1s, add 0 if not and 1 if yes

const indexWithMoreThanFourOnes = []
matrix.forEach((row, index) => {
  if (row.filter(value => value === 1).length > 4) {
    indexWithMoreThanFourOnes.push(1)
    return
  }
  indexWithMoreThanFourOnes.push(0)
})

console.log(indexWithMoreThanFourOnes)

// check which has less than five 1s, add 0 if not and 1 if yes

const indexWithLessThanFiveOnes = []
matrix.forEach((row, index) => {
  if (row.filter(value => value === 1).length < 5) {
    indexWithLessThanFiveOnes.push(1)
    return
  }
  indexWithLessThanFiveOnes.push(0)
})

console.log(indexWithLessThanFiveOnes)

// add bias
matrix = matrix.map(row => [1, ...row])

// function that takes 80% of the data for training and 20% for testing
