/* globals describe, expect, it, jest */
const CountDownTimer = require('../src')

jest.useFakeTimers()

describe('CountDown', () => {
  const options = {
    timeStamp: 0,
    countStep: 1000,
    leadingZero: false,
    onInitialize: function noop() {},
    onCount: function noop() {},
    onCountEnd: function noop() {},
  }

  it('should return default data', () => {
    const initialOptions = CountDownTimer.getInitialOptions()
    expect(JSON.stringify(initialOptions)).toEqual(JSON.stringify(options))
  })

  it('should return expected data', () => {
    const props = { countStep: 10, leadingZero: true }
    const initialOptions = CountDownTimer.getInitialOptions(props)
    expect(JSON.stringify(initialOptions)).toEqual(JSON.stringify({ ...options, ...props }))
  })

  it('should destroy timer after five seconds', () => {
    const onCount = jest.fn()
    const timeStamp = Date.now() + 24 * 60 * 60 * 1000
    const Timer = new CountDownTimer({ timeStamp, onCount })

    setTimeout(() => Timer.destroy(), 5000)

    jest.advanceTimersByTime()
    expect(onCount).toHaveBeenCalledTimes(4)
  })
})
