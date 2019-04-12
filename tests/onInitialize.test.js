/* globals describe, expect, it, jest */
const CountDownTimer = require('../src')

describe('onInitialize', () => {
  it('should be called one time', () => {
    jest.useFakeTimers()
    const onInitialize = jest.fn()
    const timeStamp = Date.now() + 5000
    new CountDownTimer({ timeStamp, onInitialize })

    jest.advanceTimersByTime(5000)
    expect(onInitialize).toHaveBeenCalledTimes(1)
  })

  it('should be return expected data', () => {
    let values
    const timeStamp = Date.now() + 24 * 60 * 60 * 1000
    const onInitialize = (timeLeft) => (values = timeLeft)
    new CountDownTimer({ timeStamp, onInitialize })
    expect(values).toEqual({ days: '1', hours: '0', minutes: '0', seconds: '0' })
  })
})
