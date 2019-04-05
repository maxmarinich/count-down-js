const normalizeMillis = (timeStamp, countStep) => {
  const millis = timeStamp - Date.now()
  if (millis > countStep) {
    return millis - (millis % countStep)
  }
  return 0
}

const getTimeLeft = (duration, options = {}) => {
  const { countStep, leadingZero } = options
  const seconds = duration / countStep
  return getValues(seconds, { leadingZero })
}

const getValues = (seconds, options = {}) => {
  if (isNaN(seconds)) return null

  const minutes = seconds / 60
  const hours = seconds / (60 * 60)
  const leftSeconds = Math.floor(seconds % 60)
  const leftMinutes = Math.floor(minutes % 60)
  const leftHours = Math.floor(hours % 24)
  const leftDays = Math.floor(hours / 24)
  const result = { days: leftDays, hours: leftHours, minutes: leftMinutes, seconds: leftSeconds }

  return options.leadingZero ? addLeadingZeroes(result) : valuesToString(result)
}

const addLeadingZeroes = (values = {}) => {
  return reduce(values, addLeadingZero)
}

const valuesToString = (values = {}) => {
  return reduce(values, String)
}

const addLeadingZero = (value) => {
  if (isNaN(value)) return String(value)
  return value < 10 ? `0${value}` : String(value)
}

const reduce = (values, callback) => {
  return Object.keys(values).reduce((acc, key) => {
    acc[key] = callback(values[key])
    return acc
  }, {})
}

module.exports = { normalizeMillis, getTimeLeft }
