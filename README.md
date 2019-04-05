### CountDownJS
Lightweight realtime countdown timer JavaScript Library

### Features
* Pure JavaScript
* Simple use
* Flexible parametrization

### _Install_

```apacheconfig
npm install count-down-js
```


### _Options_
```javascript
    {
      timeStamp: 0, // value in milliseconds
      countStep: 1000, // value in milliseconds
      leadingZero: false, // adds leading zero before the value if it's a single digit
      onCount: function() {},
      onCountEnd: function() {},
    }
```

### _Methods_

* `destroy ()`

### _How to use_
```javascript
    import CountDown from 'count-down-js'
    
    const timeStamp = Date.now() + 24 * 60 * 60 * 1000
    const onCount = (timeLeft) => console.log(timeLeft)
    const onCountEnd = (timeLeft) => console.log(timeLeft)
    
    const CountDownTimer = new CountDown({ timeStamp, onCount, onCountEnd })
    
    // output on every tick
    const timeLeft = { days: 0, hours: 23, minutes: 59, seconds: 59 }
    
    // output on count end (not called when destroy)
    const timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    
    
    setTimeout(() => CountDownTimer.destroy(), 5000)

```

#### Tests
```apacheconfig
npm test
```
