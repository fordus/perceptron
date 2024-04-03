/**
 * Applies the activation function to the given value.
 * @param {number} value - The input value.
 * @returns {number} - The result of the activation function.
 */
export function activationFunction (value) {
  return value >= 0 ? 1 : 0
}

/**
 * Calculates the inner product of two vectors.
 *
 * @param {number[]} vector1 - The values of the first vector.
 * @param {number[]} vector2 - The values of the second vector.
 * @returns {number} The inner product of the two vectors.
 */
export function innerProduct (vector1, vector2) {
  let sum = 0
  for (let i = 0; i < vector1.length; i++) {
    sum += vector1[i] * vector2[i]
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
export function multiplyVectorByScalar (vector, scalar) {
  return vector.map(value => value * scalar)
}

/**
 * Calculates the sum of two vectors.
 *
 * @param {number[]} vector1 - The first vector.
 * @param {number[]} vector2 - The second vector.
 * @returns {number[]} The sum of the two vectors.
 */
export function sumVectors (vector1, vector2) {
  return vector1.map((value, index) => value + vector2[index])
}
