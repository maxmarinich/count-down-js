const { normalizeMillis, getTimeLeft } = require('./utils');
const options = require('./options');

class CountDown {
  constructor(props) {
    this.props = CountDown.getInitialOptions(props);
    this.handleOnInitialize();
    this.handleCountDown();
  }

  static getInitialOptions(props = {}) {
    return {
      timeStamp: props.timeStamp || options.timeStamp,
      countStep: props.countStep || options.countStep,
      leadingZero: props.leadingZero || options.leadingZero,
      onInitialize: props.onInitialize || options.noop,
      onCount: props.onCount || options.noop,
      onCountEnd: props.onCountEnd || options.noop,
      onDestroy: props.onDestroy || options.noop,
    };
  }

  handleOnInitialize() {
    const { timeStamp, countStep, leadingZero, onInitialize } = this.props;
    const duration = normalizeMillis(timeStamp, countStep);
    const timeLeft = getTimeLeft(duration, { countStep, leadingZero });

    onInitialize(timeLeft);
  }

  handleCountDown(countStep = 0) {
    this.timerId = setTimeout(() => {
      const { timeStamp, countStep } = this.props;
      const duration = normalizeMillis(timeStamp, countStep);

      if (duration) {
        this.handleCountDown(countStep);
        this.handleOnCount(duration);
      } else {
        this.handleOnCountEnd(duration);
        this.destroy();
      }
    }, countStep);
  }

  handleOnCount(duration) {
    const { countStep, leadingZero, onCount } = this.props;
    const timeLeft = getTimeLeft(duration, { countStep, leadingZero });

    onCount(timeLeft);
  }

  handleOnCountEnd(duration) {
    const { countStep, leadingZero, onCountEnd } = this.props;
    const timeLeft = getTimeLeft(duration, { countStep, leadingZero });

    onCountEnd(timeLeft);
  }

  destroy() {
    const { onDestroy } = this.props;

    clearTimeout(this.timerId);
    onDestroy();
  }
}

module.exports = CountDown;
