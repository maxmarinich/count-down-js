const { normalizeMillis, getTimeLeft } = require('./utils')
const options = require('./options')

class CountDown {
  constructor(props) {
    this.state = CountDown.getInitialOptions(props)
    this.handleBeforeCountDownStart(this.state)
    this.handleCountDownStart()
  }

  static getInitialOptions(props) {
    return {
      timeStamp: props.timeStamp || options.timeStamp,
      countStep: props.countStep || options.countStep,
      leadingZero: props.leadingZero || options.leadingZero,
      onCount: props.onCount || options.noop,
      onCountEnd: props.onCountEnd || options.noop,
    }
  }

  destroy() {
    clearTimeout(this.timerId)
  }

  handleCountDownStart() {
    const { timeStamp, countStep } = this.state

    this.timerId = setTimeout(() => {
      const duration = normalizeMillis(timeStamp, countStep)
      if (duration) {
        this.handleCountDownStart()
        this.handleOnCount(duration)
      } else {
        this.handleOnCountEnd(duration)
        this.destroy()
      }
    }, countStep)
  }

  handleBeforeCountDownStart(state) {
    if (!this.timerId) {
      const { timeStamp, countStep } = state
      const duration = normalizeMillis(timeStamp, countStep)
      this.handleOnCount(duration)
    }
  }

  handleOnCount(duration) {
    const { countStep, leadingZero, onCount } = this.state
    const timeLeft = getTimeLeft(duration, { countStep, leadingZero })
    onCount(timeLeft)
  }

  handleOnCountEnd(duration) {
    const { countStep, leadingZero, onCountEnd } = this.state
    const timeLeft = getTimeLeft(duration, { countStep, leadingZero })
    onCountEnd(timeLeft)
  }
}

module.exports = CountDown
