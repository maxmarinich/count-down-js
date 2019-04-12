/* globals describe, expect, it, jest */
const CountDownTimer = require('../src')

describe('onCount', () => {
  jest.useFakeTimers()

  it('should not call `onCount`', () => {
    const counts = []
    const timeStamp = Date.now() + 24 * 60 * 60 * 1000
    const Timer = new CountDownTimer({ timeStamp, onCount: () => counts.push(1) })
    Timer.destroy()
    expect(counts.length).toEqual(0)
  })

  it('should be called `onCount` five times', () => {
    const onCount = jest.fn()
    const timeStamp = Date.now() + 5000
    new CountDownTimer({ timeStamp, onCount })

    jest.advanceTimersByTime(5000)
    expect(onCount).toHaveBeenCalledTimes(5)
  })
})
