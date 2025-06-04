import { renderHook } from '@testing-library/react'
import { useIsMobile } from '../use-mobile'

const MOBILE_BREAKPOINT = 768

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: window.innerWidth < MOBILE_BREAKPOINT,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  })
})

function setScreenWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width })
  window.dispatchEvent(new Event('resize'))
}

describe('useIsMobile', () => {
  it('returns true when width is less than breakpoint', () => {
    setScreenWidth(MOBILE_BREAKPOINT - 1)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('returns false when width is greater than or equal to breakpoint', () => {
    setScreenWidth(MOBILE_BREAKPOINT)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })
})
