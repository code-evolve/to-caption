/*!
 * to-caption
 *
 * Copyright 2016-2026 Steven Spungin
 * Released under the MIT license
 */

export interface ToCaptionOptions {
  /**
   * How to caption a string that has letters and none of them lowercase.
   * 'keep' returns the string exactly as given, 'titlecase' capitalizes each word,
   * anything else spaces every capital as its own word
   */
  onAllUppercase?: 'default' | 'keep' | 'titlecase' | null
  /**
   * How to caption a run of capitals inside a word.
   * 'keep' holds the run together (parseHTTPResponse becomes Parse HTTP Response),
   * anything else spaces every capital as its own word
   */
  acronyms?: 'split' | 'keep' | null
  /**
   * How to caption digits inside a word.
   * 'split' puts a space between digits and letters (address2 becomes Address 2),
   * anything else leaves them attached
   */
  numbers?: 'keep' | 'split' | null
  /**
   * The characters that separate words, replacing the default '._-'
   */
  delimiters?: string | null
}

declare function toCaption(text?: string | null, options?: ToCaptionOptions | null): string

export default toCaption
