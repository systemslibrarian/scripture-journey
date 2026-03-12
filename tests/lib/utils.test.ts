import { describe, it, expect } from 'vitest'
import { classNames } from '@/lib/utils'

describe('classNames', () => {
  it('joins all strings with space', () => {
    expect(classNames('a', 'b', 'c')).toBe('a b c')
  })

  it('filters out false', () => {
    expect(classNames('a', false, 'b')).toBe('a b')
  })

  it('filters out null', () => {
    expect(classNames('a', null, 'b')).toBe('a b')
  })

  it('filters out undefined', () => {
    expect(classNames('a', undefined, 'b')).toBe('a b')
  })

  it('filters out empty string', () => {
    expect(classNames('a', '', 'b')).toBe('a b')
  })

  it('handles mix of truthy and falsy', () => {
    expect(classNames('px-4', false, null, 'text-sm', undefined, '', 'mt-2')).toBe('px-4 text-sm mt-2')
  })

  it('returns single value unchanged', () => {
    expect(classNames('only')).toBe('only')
  })

  it('returns empty string when called with no args', () => {
    expect(classNames()).toBe('')
  })

  it('returns empty string when all values are falsy', () => {
    expect(classNames(false, null, undefined, '')).toBe('')
  })
})
