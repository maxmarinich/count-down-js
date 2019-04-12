/* globals describe, expect, it, */
const Utils = require('../src/utils')

describe('Utils', () => {
  it('- normalizeMillis: should return value greater than zero', () => {
    const timeStamp = Date.now() + 5000
    const millis = Utils.normalizeMillis(timeStamp, 1000)
    expect(millis > 0).toBeTruthy()
  })

  it('- normalizeMillis: should return zero', () => {
    const timeStamp = Date.now()
    const millis = Utils.normalizeMillis(timeStamp, 1000)
    expect(millis).toEqual(0)
  })

  it('- getTimeLeft: should return default data', () => {
    const values = Utils.getTimeLeft(5000)
    expect(values).toEqual(null)
  })

  it('- getTimeLeft: should return expected data', () => {
    const values = Utils.getTimeLeft(5000, { countStep: 100 })
    const expected = { days: '0', hours: '0', minutes: '0', seconds: '50' }
    expect(values).toEqual(expected)
  })

  it('- getValues: should return expected data if has `leadingZero` option', () => {
    const seconds = 1000
    const values = Utils.getValues(seconds, { leadingZero: true })
    const expected = { days: '00', hours: '00', minutes: '16', seconds: '40' }
    expect(values).toEqual(expected)
  })

  it('- getValues: should return expected data if no `leadingZero` option', () => {
    const seconds = 1000
    const values = Utils.getValues(seconds)
    const expected = { days: '0', hours: '0', minutes: '16', seconds: '40' }
    expect(values).toEqual(expected)
  })

  it('- addLeadingZero: should return expected data if value is not a number', () => {
    const values = Utils.addLeadingZero()
    expect(values).toEqual('undefined')
  })

  it('- addLeadingZero: should return expected data if value less ten', () => {
    const values = Utils.addLeadingZero(0)
    expect(values).toEqual('00')
  })

  it('- addLeadingZero: should return expected data if value not less ten', () => {
    const values = Utils.addLeadingZero(10)
    expect(values).toEqual('10')
  })

  it('- reduce: should return expected data', () => {
    const values = Utils.reduce({ days: 0 }, String)
    expect(values).toEqual({ days: '0' })
  })
})
