/*!
 * to-caption
 *
 * Copyright 2016-2026 Steven Spungin
 * Released under the MIT license
 */

/**
 * Converts camelCase, PascalCase and delimited (dot, underscore, dash) strings to a caption.
 *
 * Leading and trailing delimiters are ignored.  Multiple delimiters are ignored.
 */

const DEFAULT_DELIMITERS = '._-'

const rxUpper = /\p{Lu}/u
const rxLower = /\p{Ll}/u
const rxDigit = /\p{Nd}/u

/**
 * Splits a string on delimiters, dropping empty words
 *
 * @param {string} str
 * @param {string} delimiters
 * @return {string[]}
 */
function toWords(str, delimiters) {
  const words = []
  let word = ''
  for (const ch of str) {
    if (delimiters.includes(ch)) {
      if (word) {
        words.push(word)
      }
      word = ''
    } else {
      word += ch
    }
  }
  if (word) {
    words.push(word)
  }
  return words
}

/**
 * Whether a new part of a word starts at chars[i]
 *
 * @param {string[]} chars
 * @param {number} i
 * @param {{splitCapitals: boolean, keepAcronyms: boolean, splitNumbers: boolean}} rules
 * @return {boolean}
 */
function startsPart(chars, i, { splitCapitals, keepAcronyms, splitNumbers }) {
  const ch = chars[i]
  const prev = chars[i - 1]
  if (splitNumbers && rxDigit.test(ch) !== rxDigit.test(prev)) {
    return true
  }
  if (!splitCapitals || !rxUpper.test(ch)) {
    return false
  }
  if (!keepAcronyms || !rxUpper.test(prev)) {
    return true
  }
  // inside a run of capitals, only the one that begins a word starts a part: HTTP|Response
  const next = chars[i + 1]
  return next !== undefined && rxLower.test(next)
}

/**
 * Splits a word into the parts a caption puts spaces between
 *
 * @param {string} word
 * @param {{splitCapitals: boolean, keepAcronyms: boolean, splitNumbers: boolean}} rules
 * @return {string[]}
 */
function toParts(word, rules) {
  const chars = Array.from(word)
  const parts = []
  let part = chars[0]
  for (let i = 1; i < chars.length; i++) {
    if (startsPart(chars, i, rules)) {
      parts.push(part)
      part = ''
    }
    part += chars[i]
  }
  parts.push(part)
  return parts
}

/**
 * @param {string} part
 * @return {string}
 */
function capitalize(part) {
  const [first, ...rest] = Array.from(part)
  return first.toUpperCase() + rest.join('')
}

/**
 * @param {string} part
 * @return {string}
 */
function titlecase(part) {
  const [first, ...rest] = Array.from(part)
  return first.toUpperCase() + rest.join('').toLowerCase()
}

/**
 * A string is all uppercase when it has at least one cased letter and no lowercase one
 *
 * @param {string} str
 * @return {boolean}
 */
function isAllUppercase(str) {
  return str === str.toUpperCase() && str !== str.toLowerCase()
}

/**
 *
 * @param str The string to convert
 * @param options
 *   onAllUppercase: undefined | 'default' | 'keep' | 'titlecase'
 *   acronyms: undefined | 'split' | 'keep'
 *   numbers: undefined | 'keep' | 'split'
 *   delimiters: undefined | string
 * @return {string}
 */
export default function toCaption(str, options) {
  if (typeof str !== 'string') {
    return ''
  }
  const { onAllUppercase, acronyms, numbers, delimiters } = options || {}
  const words = toWords(str, typeof delimiters === 'string' ? delimiters : DEFAULT_DELIMITERS)
  const splitNumbers = numbers === 'split'

  if (isAllUppercase(str)) {
    if (onAllUppercase === 'keep') {
      return str
    }
    if (onAllUppercase === 'titlecase') {
      return words
        .flatMap(word => toParts(word, { splitCapitals: false, splitNumbers }))
        .map(titlecase)
        .join(' ')
    }
  }
  return words
    .flatMap(word => toParts(word, { splitCapitals: true, keepAcronyms: acronyms === 'keep', splitNumbers }))
    .map(capitalize)
    .join(' ')
}
