/*!
 * to-caption
 *
 * Copyright 2016-2026 Steven Spungin
 * Released under the MIT license
 */

import { expect } from 'chai'
import toCaption from '../src/index.js'

describe('acronyms', () => {

  it('splits every capital by default', () => {
    expect(toCaption('parseHTTPResponse')).to.equal('Parse H T T P Response')
    expect(toCaption('parseHTTPResponse', { acronyms: 'split' })).to.equal('Parse H T T P Response')
  })

  it('keeps a run of capitals together', () => {
    expect(toCaption('parseHTTPResponse', { acronyms: 'keep' })).to.equal('Parse HTTP Response')
  })

  it('keeps a trailing run', () => {
    expect(toCaption('userID', { acronyms: 'keep' })).to.equal('User ID')
  })

  it('keeps a leading run', () => {
    expect(toCaption('XMLHttpRequest', { acronyms: 'keep' })).to.equal('XML Http Request')
  })

  it('still splits a one-letter word from the next', () => {
    expect(toCaption('thisIsATest', { acronyms: 'keep' })).to.equal('This Is A Test')
  })

  it('keeps an all uppercase word whole', () => {
    expect(toCaption('FOOBAR', { acronyms: 'keep' })).to.equal('FOOBAR')
  })

  it('still replaces delimiters in an all uppercase string', () => {
    expect(toCaption('HELLO_WORLD', { acronyms: 'keep' })).to.equal('HELLO WORLD')
  })

  it('yields to onAllUppercase', () => {
    expect(toCaption('HELLO_WORLD', { acronyms: 'keep', onAllUppercase: 'titlecase' })).to.equal('Hello World')
  })

  it('changes nothing in ordinary camelCase', () => {
    expect(toCaption('fooBarBaz', { acronyms: 'keep' })).to.equal('Foo Bar Baz')
  })

})

describe('numbers', () => {

  it('splits digits from letters', () => {
    expect(toCaption('address2', { numbers: 'split' })).to.equal('Address 2')
  })

  it('capitalizes the word after a number', () => {
    expect(toCaption('item2name', { numbers: 'split' })).to.equal('Item 2 Name')
    expect(toCaption('item2Name', { numbers: 'split' })).to.equal('Item 2 Name')
  })

  it('keeps a multi-digit number together', () => {
    expect(toCaption('version10Beta3', { numbers: 'split' })).to.equal('Version 10 Beta 3')
  })

  it('handles a leading number', () => {
    expect(toCaption('3dModel', { numbers: 'split' })).to.equal('3 D Model')
  })

  it('applies in titlecase', () => {
    expect(toCaption('HTTP2_SERVER', { numbers: 'split', onAllUppercase: 'titlecase' })).to.equal('Http 2 Server')
  })

  it('combines with acronyms', () => {
    expect(toCaption('parseHTTP2Response', { numbers: 'split', acronyms: 'keep' })).to.equal('Parse HTTP 2 Response')
  })

  it('leaves digits attached when keep', () => {
    expect(toCaption('address2', { numbers: 'keep' })).to.equal('Address2')
  })

})

describe('delimiters', () => {

  it('replaces the default set', () => {
    expect(toCaption('foo bar/baz', { delimiters: ' /' })).to.equal('Foo Bar Baz')
  })

  it('stops treating the defaults as delimiters', () => {
    expect(toCaption('foo.bar_baz', { delimiters: '/' })).to.equal('Foo.bar_baz')
  })

  it('accepts an empty set', () => {
    expect(toCaption('foo.barBaz', { delimiters: '' })).to.equal('Foo.bar Baz')
  })

  it('ignores leading, trailing and repeated custom delimiters', () => {
    expect(toCaption('//foo//bar//', { delimiters: '/' })).to.equal('Foo Bar')
  })

  it('falls back to the default for a non-string', () => {
    expect(toCaption('foo_bar', { delimiters: null })).to.equal('Foo Bar')
  })

  it('applies in titlecase', () => {
    expect(toCaption('HELLO WORLD', { delimiters: ' ', onAllUppercase: 'titlecase' })).to.equal('Hello World')
  })

})
