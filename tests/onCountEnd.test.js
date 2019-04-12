/* globals describe, expect, it, jest */
const CountDownTimer = require('../src')

describe('onCount', () => {
  jest.useFakeTimers()

  it('should be called `onCountEnd` one time', () => {
    const counts = []
    const timeStamp = Date.now() + 1000
    new CountDownTimer({ timeStamp, onCountEnd: () => counts.push(1) })

    jest.advanceTimersByTime(10000)
    expect(counts.length).toEqual(1)
  })
})
