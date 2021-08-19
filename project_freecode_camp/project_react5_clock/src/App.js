import React from "react";
import "./dist/App.css";

//e.target là thứ kích hoạt trình điều phối sự kiện( kích hoạt event)
//e.currentTarget là thứ mà bạn đã chỉ định người nghe của mình.(ptu dat eventListener)

//ham nhan interval/timeout theo dang (func, time).
const accurateInterval = function (fn, time) {
  var cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime() + time;
  timeout = null;
  wrapper = function () {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function () {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel,
  };
};

// COMPONENTS:
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeState: "stopped",
      timeType: "Session",
      time: 1500,
      intervalID: "",
      alarmColor: { color: "gray",fontFamily:'digital'},
    };
  }
  setBreakLength = (e) => {
    this.lengthControl(
      "breakLength",
      e.currentTarget.value,
      this.state.breakLength,
      "Session"
    );
  };
  setSessionLength = (e) => {
    this.lengthControl(
      "sessionLength",
      e.currentTarget.value,
      this.state.sessionLength,
      "Break"
    );
  };

  lengthControl = (stateToChange, sign, currentLength, timeType) => {
    if (this.state.timeState === "running") {
      return;
    }
    if (this.state.timeType === timeType) {
      if (sign === "-" && currentLength !== 1) {
        this.setState({ [stateToChange]: currentLength - 1 });
      } else if (sign === "+" && currentLength !== 60) {
        this.setState({ [stateToChange]: currentLength + 1 });
      }
    } else if (sign === "-" && currentLength !== 1) {
      this.setState({
        [stateToChange]: currentLength - 1,
        time: currentLength * 60 - 60,
      });
    } else if (sign === "+" && currentLength !== 60) {
      this.setState({
        [stateToChange]: currentLength + 1,
        time: currentLength * 60 + 60,
      });
    }
  };

  timeControl = () => {
    if (this.state.timeState === "stopped") {
      this.beginCountDown();
      this.setState({ timeState: "running" });
    } else {
      this.setState({ timeState: "stopped" });
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
    }
  };
  beginCountDown = () => {
    this.setState({
      intervalID: accurateInterval(() => {
        this.decrementTime();
        this.phaseControl();
      }, 1000),
    });
  };
  decrementTime = () => {
    this.setState({ time: this.state.time - 1 });
  };
  phaseControl = () => {
    let time = this.state.time;
    this.warning(time);
    this.buzzer(time);
    if (time < 0) {
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
      if (this.state.timeType === "Session") {
        this.beginCountDown();
        this.switchTime(this.state.breakLength * 60, "Break");
      } else {
        this.beginCountDown();
        this.switchTime(this.state.sessionLength * 60, "Session");
      }
    }
  };
  warning = (_time) => {
    if (_time < 61) {
      this.setState({ alarmColor: { color: "#a50d0d" } });
    } else {
      this.setState({ alarmColor: { color: "gray"} });
    }
  };
  buzzer = (_time) => {
    if (_time === 0) {
      this.audioBeep.play();
    }
  };
  switchTime = (num, str) => {
    this.setState({
      time: num,
      timeType: str,
      alarmColor: { color: "gray"},
    });
  };
  clockify = () => {
    let minutes = Math.floor(this.state.time / 60);
    let seconds = this.state.time - minutes * 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return minutes + ":" + seconds;
  };
  reset = () => {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timeState: "stopped",
      timeType: "Session",
      time: 1500,
      intervalID: "",
      alarmColor: { color: "gray"},
    });
    if (this.state.intervalID) {
      this.state.intervalID.cancel();
    }
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  };
  render() {
    return (
      <div id="container">
        <div className="main-title">25 + 5 Clock</div>
        <TimeControl
          addID="break-increment"
          length={this.state.breakLength}
          lengthID="break-length"
          minID="break-decrement"
          onClick={this.setBreakLength}
          title="Break Length"
          titleID="break-label"
        />
        <TimeControl
          addID="session-increment"
          length={this.state.sessionLength}
          lengthID="session-length"
          minID="session-decrement"
          onClick={this.setSessionLength}
          title="Session Length"
          titleID="session-label"
        />
        <div id='clock'>
          <div className="time-control">
            <button id="start_stop" onClick={this.timeControl}>
              Start/Stop
              <br />
              <i className="fa fa-play fa-2x" />
              <i className="fa fa-pause fa-2x" />
            </button>
            <button id="reset" onClick={this.reset}>
              Reset
              <br />
              <i className="fa fa-refresh fa-2x" />
            </button>
          </div>
          <div className="time">
            <div className="time-wrapper">
              <div id="timer-label">{this.state.timeType}</div>
              <div id="time-left" style={this.state.alarmColor}>{this.clockify()}</div>
            </div>
          </div>
          <div id='fix'></div>
        </div>
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
}
class TimeControl extends React.Component {
  render() {
    return (
      <div className="length-control">
        <div id={this.props.titleID}>{this.props.title}</div>
        <button
          className="btn-level"
          id={this.props.minID}
          onClick={this.props.onClick}
          value="-"
        >
          <i className="fa fa-arrow-down fa-2x" />
        </button>
        <span className="btn-level" id={this.props.lengthID}>
          {this.props.length}
        </span>
        <button
          className="btn-level"
          id={this.props.addID}
          onClick={this.props.onClick}
          value="+"
        >
          <i className="fa fa-arrow-up fa-2x" />
        </button>
      </div>
    );
  }
}

export default App;
