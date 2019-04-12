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


### _Default Options_
```javascript
    {
      timeStamp: 0, // value in milliseconds
      countStep: 1000, // value in milliseconds
      leadingZero: false, // adds leading zero before the value if it's a single digit
      onInitialize: function(eventObject) {},
      onCount: function(eventObject) {},
      onCountEnd: function(eventObject) {},
    }
```

### _Methods_

* `destroy ()`

### _How to use_
```javascript
    import CountDown from 'count-down-js'
    
    const timeStamp = Date.now() + 24 * 60 * 60 * 1000
    const onInitialize = (timeLeft) => console.log(timeLeft)
    const onCount = (timeLeft) => console.log(timeLeft)
    const onCountEnd = (timeLeft) => console.log(timeLeft)
    
    const CountDownTimer = new CountDown({ timeStamp, onInitialize, onCount, onCountEnd })
    
    // output on onInitialize
    const onInitializeTimeLeft = { days: 1, hours: 0, minutes: 0, seconds: 0 }
    
    // output on every tick, will be reduced by a `countStep`
    const onCountTimeLeft = { days: 0, hours: 23, minutes: 59, seconds: 59 }
    
    // output on count end (not called when destroy)
    const onCountEndTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    
    // destroy timer
    CountDownTimer.destroy()

```

#### Tests
```apacheconfig
npm test
```
#### Coverage
```apacheconfig
npm run coverage
```
