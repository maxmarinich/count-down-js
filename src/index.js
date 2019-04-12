const { normalizeMillis, getTimeLeft } = require('./utils')
const options = require('./options')

class CountDown {
  constructor(props) {
    this.props = CountDown.getInitialOptions(props)
    CountDown.handleOnInitialize(this.props)
    this.handleCountDown()
  }

  static getInitialOptions(props = {}) {
    return {
      timeStamp: props.timeStamp || options.timeStamp,
      countStep: props.countStep || options.countStep,
      leadingZero: props.leadingZero || options.leadingZero,
      onInitialize: props.onInitialize || options.noop,
      onCount: props.onCount || options.noop,
      onCountEnd: props.onCountEnd || options.noop,
    }
  }

  static handleOnInitialize(props) {
    const { timeStamp, countStep, leadingZero, onInitialize } = props
    const duration = normalizeMillis(timeStamp, countStep)
    const timeLeft = getTimeLeft(duration, { countStep, leadingZero })
    onInitialize(timeLeft)
  }

  handleCountDown() {
    const { timeStamp, countStep } = this.props

    this.timerId = setTimeout(() => {
      const duration = normalizeMillis(timeStamp, countStep)
      if (duration) {
        this.handleCountDown()
        this.handleOnCount(duration)
      } else {
        this.handleOnCountEnd(duration)
        this.destroy()
      }
    }, countStep)
  }

  handleOnCount(duration) {
    const { countStep, leadingZero, onCount } = this.props
    const timeLeft = getTimeLeft(duration, { countStep, leadingZero })
    onCount(timeLeft)
  }

  handleOnCountEnd(duration) {
    const { countStep, leadingZero, onCountEnd } = this.props
    const timeLeft = getTimeLeft(duration, { countStep, leadingZero })
    onCountEnd(timeLeft)
  }

  destroy() {
    clearTimeout(this.timerId)
  }
}

module.exports = CountDown
