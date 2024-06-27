// Note to self: Probably better to just do the analysis by hand, but this is a good reference for the future.

/**
 * Type definition for a function that takes a number and returns a number.
 */
type FunctionOfN = (n: number) => number;

/**
 * Solves a recurrence relation of the form T(n) = a * T(n/b) + f(n)
 * using the Master Theorem.
 *
 * @param {number} a - The coefficient multiplying T(n/b).
 * @param {number} b - The factor by which n is divided.
 * @param {FunctionOfN} f - The function representing the additional work done.
 * @returns {string} The Big-O notation for the time complexity of the recurrence.
 */
export function solveRecurrence(a: number, b: number, f: FunctionOfN): string {
  // Calculate log_b(a)
  const log_b_a = Math.log(a) / Math.log(b)

  /**
   * Determines the asymptotic relationship between f(n) and n^log_b(a)
   * @returns {string} - The complexity category based on Master Theorem.
   */
  function compare(): string {
    const n = 10 ** 6 // Use a large value for n to determine the asymptotic relationship
    const f_n = f(n)
    const n_log_b_a = Math.pow(n, log_b_a)

    // Case 1: f(n) is O(n^c) where c < log_b(a)
    if (f_n < n_log_b_a / Math.log(n)) {
      return `T(n) = Θ(n^${log_b_a.toFixed(2)})`
    }
    // Case 2: f(n) is Θ(n^log_b(a))
    else if (Math.abs(f_n - n_log_b_a) < n_log_b_a / Math.log(n)) {
      return `T(n) = Θ(n^${log_b_a.toFixed(2)} log n)`
    }
    // Case 3: f(n) is Ω(n^c) where c > log_b(a)
    else if (f_n > n_log_b_a * Math.log(n)) {
      return `T(n) = Θ(f(n))`
    }
    // Special Case: f(n) is a constant
    else if (f_n === f(n / 2)) {
      return `T(n) = Θ(log n)`
    }
    // Fallback for other cases
    else {
      return `T(n) = Θ(f(n))`
    }
  }

  return compare()
}

/**
 * Calculates the growth rate of a function by comparing the output of the function for two different inputs.
 *
 * @param {FunctionOfN} f - The function to calculate the growth rate for.
 * @returns {number} The growth rate of the function.
 */
export function getGrowthRate(f: FunctionOfN, C?: number): number {
  let n1 = 10 ** 6 // A large value for n to simulate the behavior for large inputs
  let n2 = n1 + 1 // A slightly larger value for n

  let resultF1 = C ? C * f(n1) : f(n1)
  let resultF2 = C ? C * f(n2) : f(n2)

  // If the function's output is Infinity for the given inputs, reduce the inputs and try again
  while (resultF1 === Infinity || resultF2 === Infinity) {
    n1 /= 10
    n2 /= 10
    resultF1 = C ? C * f(n1) : f(n1)
    resultF2 = C ? C * f(n2) : f(n2)
  }

  // Calculate the growth rate as the ratio of the change in output to the change in input
  const growthRate = (resultF2 - resultF1) / (n2 - n1)
  // console.log('growthRate', growthRate)

  return growthRate
}

/**
 * Checks if f is O(g), i.e., if f(n) <= C * g(n) for some constant C and for sufficiently large n.
 *
 * @param {FunctionOfN} f - The function to check.
 * @param {FunctionOfN} g - The function to compare against.
 * @returns {boolean} True if f is O(g), otherwise false.
 */
export function isBigO(f: FunctionOfN, g: FunctionOfN, C: number): boolean {
  return getGrowthRate(f) <= getGrowthRate(g, C)
}

/**
 * Checks if f is Ω(g), i.e., if f(n) >= C * g(n) for some constant C and for sufficiently large n.
 *
 * @param {FunctionOfN} f - The function to check.
 * @param {FunctionOfN} g - The function to compare against.
 * @returns {boolean} True if f is Ω(g), otherwise false.
 */
export function isOmega(f: FunctionOfN, g: FunctionOfN, C: number): boolean {
  return getGrowthRate(f) >= getGrowthRate(g, C)
}

/**
 * Checks if f is Θ(g), i.e., if f(n) = C * g(n) for some constant C and for sufficiently large n.
 *
 * @param {FunctionOfN} f - The function to check.
 * @param {FunctionOfN} g - The function to compare against.
 * @returns {boolean} True if f is Θ(g), otherwise false.
 */
export function isTheta(f: FunctionOfN, g: FunctionOfN, C: number): boolean {
  return isBigO(f, g, C) && isOmega(f, g, C)
}

/**
 * Checks if f is o(g), i.e., if f(n) < C * g(n) for all constants C and for sufficiently large n.
 *
 * @param {FunctionOfN} f - The function to check.
 * @param {FunctionOfN} g - The function to compare against.
 * @returns {boolean} True if f is o(g), otherwise false.
 */
export function isLittleO(f: FunctionOfN, g: FunctionOfN, C: number): boolean {
  return getGrowthRate(f) < getGrowthRate(g, C)
}

/**
 * Checks if f is ω(g), i.e., if f(n) > C * g(n) for all constants C and for sufficiently large n.
 *
 * @param {FunctionOfN} f - The function to check.
 * @param {FunctionOfN} g - The function to compare against.
 * @returns {boolean} True if f is ω(g), otherwise false.
 */
export function isLittleOmega(f: FunctionOfN, g: FunctionOfN, C: number): boolean {
  return getGrowthRate(f) > getGrowthRate(g, C)
}

export function factorialize(num: number): number {
  let result = num
  if (num === 0 || num === 1)
    return 1
  while (num > 1) {
    num--
    result *= num
  }
  return result
}