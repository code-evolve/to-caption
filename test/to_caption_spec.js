/*!
 * to-caption
 *
 * Copyright 2016-2026 Steven Spungin
 * Released under the MIT license
 */

import { expect } from 'chai'
import toCaption from '../src/index.js'

describe('toCaption', () => {

  it('converts lowercase', () => {
    expect(toCaption('foobar')).to.equal('Foobar')
  })

  it('accepts uppercase', () => {
    expect(toCaption('Foobar')).to.equal('Foobar')
  })

  it('converts camelcase', () => {
    expect(toCaption('fooBar')).to.equal('Foo Bar')
  })

  it('converts pascalcase', () => {
    expect(toCaption('FooBar')).to.equal('Foo Bar')
  })

  it('converts dot', () => {
    expect(toCaption('foo.bar')).to.equal('Foo Bar')
  })

  it('converts dash', () => {
    expect(toCaption('foo-bar')).to.equal('Foo Bar')
  })

  it('converts underscore', () => {
    expect(toCaption('foo_bar')).to.equal('Foo Bar')
  })

  it('converts multiple delimiters', () => {
    expect(toCaption('foo----bar')).to.equal('Foo Bar')
  })

  it('converts mixed delimiters', () => {
    expect(toCaption('--foo._-bar--')).to.equal('Foo Bar')
  })

  it('converts multiple prefix', () => {
    expect(toCaption('-----foo-bar')).to.equal('Foo Bar')
  })

  it('converts multiple suffix', () => {
    expect(toCaption('foo-bar----')).to.equal('Foo Bar')
  })

  it('capitalizes each word', () => {
    expect(toCaption('this.is.a.test')).to.equal('This Is A Test')
  })

  it('spaces consecutive capitals', () => {
    expect(toCaption('thisIsATest')).to.equal('This Is A Test')
  })

  it('does not double space a capital after a delimiter', () => {
    expect(toCaption('foo_Bar')).to.equal('Foo Bar')
  })

  it('leaves slashes alone', () => {
    expect(toCaption('foo/bar')).to.equal('Foo/bar')
  })

  it('accepts null', () => {
    expect(toCaption(null)).to.equal('')
  })

  it('accepts undefined', () => {
    expect(toCaption(undefined)).to.equal('')
  })

  it('accepts nothing', () => {
    expect(toCaption()).to.equal('')
  })

  it('accepts an empty string', () => {
    expect(toCaption('')).to.equal('')
  })

  it('accepts only delimiters', () => {
    expect(toCaption('_.-')).to.equal('')
  })

  it('accepts null options', () => {
    expect(toCaption('fooBar', null)).to.equal('Foo Bar')
  })

  it('handles all uppercase -> default', () => {
    expect(toCaption('HELLO')).to.equal('H E L L O')
  })

  it('handles all uppercase -> titlecase', () => {
    expect(toCaption('HELLO', { onAllUppercase: 'titlecase' })).to.equal('Hello')
  })

  it('handles all uppercase with separator -> titlecase', () => {
    expect(toCaption('HELLO_WORLD', { onAllUppercase: 'titlecase' })).to.equal('Hello World')
  })

  it('handles all uppercase with dot -> titlecase', () => {
    expect(toCaption('HELLO.WORLD', { onAllUppercase: 'titlecase' })).to.equal('Hello World')
  })

  it('handles all uppercase with outer delimiters -> titlecase', () => {
    expect(toCaption('_HELLO_', { onAllUppercase: 'titlecase' })).to.equal('Hello')
  })

  it('handles all uppercase -> keep', () => {
    expect(toCaption('HELLO', { onAllUppercase: 'keep' })).to.equal('HELLO')
  })

  it('ignores options when not all uppercase', () => {
    expect(toCaption('helloWorld', { onAllUppercase: 'keep' })).to.equal('Hello World')
  })

  it('treats a string with no letters as not all uppercase', () => {
    expect(toCaption('123_456', { onAllUppercase: 'keep' })).to.equal('123 456')
    expect(toCaption('___', { onAllUppercase: 'keep' })).to.equal('')
  })

  it('keeps an all uppercase string exactly, delimiters included', () => {
    expect(toCaption('_HELLO_WORLD_', { onAllUppercase: 'keep' })).to.equal('_HELLO_WORLD_')
  })

  it('does not split capitals after a digit or symbol in titlecase', () => {
    expect(toCaption('AAAA1A', { onAllUppercase: 'titlecase' })).to.equal('Aaaa1a')
    expect(toCaption('AAAA/A', { onAllUppercase: 'titlecase' })).to.equal('Aaaa/a')
  })

  it('returns an empty string for a non-string', () => {
    expect(toCaption(42)).to.equal('')
    expect(toCaption({})).to.equal('')
  })

  it('leaves digits attached by default', () => {
    expect(toCaption('address2')).to.equal('Address2')
    expect(toCaption('item2Name')).to.equal('Item2 Name')
  })

  it('spaces non-ASCII capitals', () => {
    expect(toCaption('fooÉtatÜber')).to.equal('Foo État Über')
  })

  it('capitalizes a non-ASCII first letter', () => {
    expect(toCaption('écoleNormale')).to.equal('École Normale')
  })

  it('titlecases non-ASCII words', () => {
    expect(toCaption('ÉCOLE_NORMALE', { onAllUppercase: 'titlecase' })).to.equal('École Normale')
  })

  it('keeps a character outside the basic plane whole', () => {
    expect(toCaption('😀fooBar')).to.equal('😀foo Bar')
  })

})
