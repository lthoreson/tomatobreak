class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutesLeft: 0,
      secondsLeft: 0,
      sessionLength: 25,
      breakLength: 5,
      run: false,
      timeID: 0,
      work: true,
      phase: 0,
      count: 0 };

    this.handleClick = this.handleClick.bind(this);
    this.startClock = this.startClock.bind(this);
    this.stopClock = this.stopClock.bind(this);
    this.resetClock = this.resetClock.bind(this);
  }

  resetClock(phase) {
    this.setState(state => ({
      minutesLeft: state.sessionLength,
      secondsLeft: 0,
      run: false,
      timeID: clearInterval(state.timeID),
      work: true,
      phase: phase }));

  }

  startClock() {
    this.setState({
      minutesLeft: this.state.sessionLength,
      run: true,
      phase: 1,
      timeID: clearTimeout(this.state.timeID) });

    const decrement = () => {
      this.setState(state => {
        if (state.secondsLeft > 0) {
          return { secondsLeft: state.secondsLeft - 1 };
        } else if (state.minutesLeft > 0) {
          return { secondsLeft: 59, minutesLeft: state.minutesLeft - 1 };
        } else {
          const clip = document.getElementById('beep');
          clip.currentTime = 0;
          clip.play();
          if (state.work) {
            return {
              minutesLeft: state.breakLength,
              secondsLeft: 5,
              work: false,
              phase: 2,
              count: state.count + 1 };

          } else {
            this.resetClock(0);
          }
        }
      });
    };
    this.setState({ timeID: setInterval(decrement, 1000) });
  }
  stopClock() {
    this.setState({ run: false });
    clearInterval(this.state.timeID);
  }

  handleClick(event) {
    switch (event.target.id) {
      case 'reset':
        this.resetClock(0);
        break;
      case 'tomatoButton':
        if (!this.state.run) {
          this.startClock();
        } else {
          this.resetClock(3);
          this.setState({ timeID: setTimeout(() => this.setState({ phase: 0 }), 2000) });
        }
        break;
      case 'session-increment':
        if (this.state.sessionLength < 55) {
          this.setState({ sessionLength: this.state.sessionLength + 1 });
          if (this.state.work) {
            this.setState({ minutesLeft: this.state.minutesLeft + 1 });
          }
        }
        break;
      case 'session-decrement':
        if (this.state.sessionLength > 1) {
          this.setState({ sessionLength: this.state.sessionLength - 1 });
          if (this.state.work) {
            this.setState({ minutesLeft: this.state.minutesLeft - 1 });
          }
        }
        break;
      case 'break-increment':
        if (this.state.minutesLeft < 55) {
          this.setState({ minutesLeft: this.state.minutesLeft + 5 });
        }
        break;
      case 'break-decrement':
        if (this.state.minutesLeft > 4) {
          this.setState({ minutesLeft: this.state.minutesLeft - 5 });
        } else {
          this.resetClock(0);
        }
        break;
      case 'start_stop':
        if (!this.state.run) {
          this.startClock();
        } else {
          this.stopClock();
        }
        break;}

  }

  render() {
    let format = '';
    let mFormat = '';
    if (this.state.secondsLeft < 10) {
      format = 0;
    }
    if (this.state.minutesLeft < 10) {
      mFormat = 0;
    }
    let type;
    this.state.work ? type = 'Break' : type = 'Session';
    let time = 'START';
    let waste = {};
    if (this.state.phase) {
      time = mFormat.toString() + this.state.minutesLeft.toString() + ':' + format.toString() + this.state.secondsLeft.toString();
    }
    if (this.state.phase === 3) {
      time = 'WASTE';
      waste = { color: "black", textShadow: '0px 0px 20px black' };
    }
    let minus = '-';
    if (this.state.minutesLeft < 5) {
      minus = 'Skip';
    }

    const elements = {
      logo: /*#__PURE__*/
      React.createElement("img", { src: "cover-copy.png", alt: "tomatobreak logo alarm clock", class: "logo" }),
      tomatoButton: /*#__PURE__*/
      React.createElement("button", { class: "tomatoButton", id: "tomatoButton", onClick: this.handleClick, style: waste }, time),
      startAnimation: /*#__PURE__*/
      React.createElement("div", { class: "circle" }, /*#__PURE__*/
      React.createElement("svg", null, /*#__PURE__*/
      React.createElement("defs", null, /*#__PURE__*/
      React.createElement("radialGradient", { id: "radial", cx: "50%", cy: "50%", r: "50%", fx: "50%", fy: "50%" }, /*#__PURE__*/
      React.createElement("stop", { offset: "20%", "stop-color": "red", "stop-opacity": ".5" }), /*#__PURE__*/
      React.createElement("stop", { offset: "100%", "stop-color": "yellow", "stop-opacity": "0" }))), /*#__PURE__*/


      React.createElement("circle", { class: "c1", cx: "50%", cy: "50%", r: "50%" }))),


      timeAnimation: /*#__PURE__*/
      React.createElement("div", { class: "circle" }, /*#__PURE__*/
      React.createElement("div", { class: "wave" }), /*#__PURE__*/
      React.createElement("svg", null, /*#__PURE__*/
      React.createElement("circle", { class: "c2", cx: "50%", cy: "50%", r: "30%" }))),


      adWindow: /*#__PURE__*/
      React.createElement("div", { class: "adWindow" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("button", { id: "break-decrement", class: "breakButton", onClick: this.handleClick }, minus), /*#__PURE__*/
      React.createElement("div", { class: "display" }, /*#__PURE__*/
      React.createElement("h1", null, time)), /*#__PURE__*/

      React.createElement("button", { id: "break-increment", class: "breakButton", onClick: this.handleClick }, "+")), /*#__PURE__*/

      React.createElement("div", { class: "videoText" }, /*#__PURE__*/
      React.createElement("p", null, "Watch ad to earn 2.385 points! ($0.01)")), /*#__PURE__*/

      React.createElement("div", { class: "video" }, /*#__PURE__*/
      React.createElement("iframe", { class: "responsive-iframe", src: "https://www.youtube.com/embed/rNBbMeI4PCo", title: "YouTube video player", frameborder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowfullscreen: true }))),


      countMessage: /*#__PURE__*/
      React.createElement("h1", null, "Count: ", this.state.count) };


    const sounds = [/*#__PURE__*/
    React.createElement("audio", { id: "beep", src: "https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Sound%20FX%20Real%20Life/452[kb]school-bell-fx.wav.mp3", preload: "auto" })];


    const layouts = {
      start: /*#__PURE__*/
      React.createElement("div", { class: "container" },
      elements.logo, /*#__PURE__*/
      React.createElement("div", { class: "buttonContainer" },
      elements.startAnimation,
      elements.tomatoButton),

      elements.countMessage,
      sounds),

      work: /*#__PURE__*/
      React.createElement("div", { class: "container" },
      elements.logo, /*#__PURE__*/
      React.createElement("div", { class: "buttonContainer" },
      elements.timeAnimation,
      elements.tomatoButton),

      elements.countMessage,
      sounds),

      waste: /*#__PURE__*/
      React.createElement("div", { class: "container" },
      elements.logo, /*#__PURE__*/
      React.createElement("div", { class: "buttonContainer" },
      elements.tomatoButton),

      elements.countMessage,
      sounds),

      break: /*#__PURE__*/
      React.createElement("div", { class: "container" },
      elements.logo,
      elements.adWindow,
      elements.countMessage,
      sounds) };



    const phases = [
    layouts.start, // Start
    layouts.work, // Timer
    layouts.break, // Break
    layouts.waste // Waste
    ];

    const old = [/*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("div", { id: "break-label" }, /*#__PURE__*/
    React.createElement("h1", null, "Break Length"), /*#__PURE__*/
    React.createElement("p", { id: "break-length" }, this.state.breakLength), /*#__PURE__*/
    React.createElement("button", { id: "break-increment", onClick: this.handleClick }, "+"), /*#__PURE__*/
    React.createElement("button", { id: "break-decrement", onClick: this.handleClick }, "-")), /*#__PURE__*/

    React.createElement("div", { id: "session-label" }, /*#__PURE__*/
    React.createElement("h1", null, "Session Length"), /*#__PURE__*/
    React.createElement("p", { id: "session-length" }, this.state.sessionLength), /*#__PURE__*/
    React.createElement("button", { id: "session-increment", onClick: this.handleClick }, "+"), /*#__PURE__*/
    React.createElement("button", { id: "session-decrement", onClick: this.handleClick }, "-")), /*#__PURE__*/

    React.createElement("div", { id: "timer-label" }, /*#__PURE__*/
    React.createElement("h1", null, "Time Until Next ", type), /*#__PURE__*/
    React.createElement("p", { id: "time-left" }, mFormat, this.state.minutesLeft, ":", format, this.state.secondsLeft), /*#__PURE__*/
    React.createElement("button", { id: "start_stop", onClick: this.handleClick }, "Start/Stop"), /*#__PURE__*/
    React.createElement("button", { id: "reset", onClick: this.handleClick }, "Reset")))];




    return /*#__PURE__*/(
      React.createElement("div", null,
      phases[this.state.phase]));


  }}
;

ReactDOM.render( /*#__PURE__*/React.createElement(Presentational, null), document.getElementById('view'));