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
 * Checks if f is O(g), i.e., if f(n) <= C * g(n) for some constant C and for sufficiently large n.
 *
 * @param {FunctionOfN} f - The function to check.
 * @param {FunctionOfN} g - The function to compare against.
 * @returns {boolean} True if f is O(g), otherwise false.
 */
export function isBigO(f: FunctionOfN, g: FunctionOfN): boolean {
  const C = 1000 // A large constant to simulate the "for sufficiently large n" condition
  let n = 10 ** 6 // A large value for n to simulate the behavior for large inputs

  let resultF = f(n)
  let resultG = C * g(n)
  // console.log('resultF', resultF)
  // console.log('resultG', resultG)

  // if resultF/resultG is Infinity, then use a lower value
  if (resultF === Infinity || resultG === Infinity) {
    console.log('value too big')
    n = 10
    resultF = f(n)
    resultG = C * g(n)
    // console.log('resultF new', resultF)
    // console.log('resultG new', resultG)
  }

  const n1 = n + 10

  let resultF1 = f(n1)
  let resultG1 = C * g(n1)
  // console.log('resultF1', resultF1)
  // console.log('resultG1', resultG1)


  const deltaF = resultF1 - resultF
  const deltaG = resultG1 - resultG
  // console.log('deltaF', deltaF)
  // console.log('deltaG', deltaG)

  return deltaF <= deltaG
}


