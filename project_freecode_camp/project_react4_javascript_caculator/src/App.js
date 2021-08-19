import React from "react";
import "./dist/App.css";

const isOperator = /[x/+-]/, //ktra bt co la toan tu
  endsWithOperator = /[x/+-]$/, //ktra bt co ket thuc voi toan tu k
  endsWithNegativeSign = /\d[x/+-]{1}-$/; //ktra bt co ket thuc voi dau am(so->1 toan tu->dau am (-))
class Keyboard extends React.Component {
  render() {
    return (
      <div id="keyboard">
        {/*xl bang onClick*/}
        <button id="clear" class="big" value="AC" onClick={this.props.clear}>
          AC
        </button>
        <button id="delete" value="Del" onClick={this.props.handlerDelete}>
          Del
        </button>
        <button id="switch" onClick={this.props.handlerSwitch}>
          Off/On
        </button>
        {/*truyen ham cho component con xl*/}
        <Calculation handlerOperator={this.props.handlerOperator} />
        <Number handlerNumber={this.props.handlerNumber} />
        <div id="fix">
          <button id="decimal" value="." onClick={this.props.handlerDecimal}>
            .
          </button>
          <button id="equals" value="=" onClick={this.props.handlerEvaluate}>
            =
          </button>
        </div>
      </div>
    );
  }
}

const Number = (props) => {
  return (
    <div id="number">
      <button id="zero" value="0" onClick={props.handlerNumber}>
        0
      </button>
      <button id="one" value="1" onClick={props.handlerNumber}>
        1
      </button>
      <button id="two" value="2" onClick={props.handlerNumber}>
        2
      </button>
      <button id="three" value="3" onClick={props.handlerNumber}>
        3
      </button>
      <button id="four" value="4" onClick={props.handlerNumber}>
        4
      </button>
      <button id="five" value="5" onClick={props.handlerNumber}>
        5
      </button>
      <button id="six" value="6" onClick={props.handlerNumber}>
        6
      </button>
      <button id="seven" value="7" onClick={props.handlerNumber}>
        7
      </button>
      <button id="eight" value="8" onClick={props.handlerNumber}>
        8
      </button>
      <button id="nine" value="9" onClick={props.handlerNumber}>
        9
      </button>
    </div>
  );
};
const Calculation = (props) => {
  return (
    <div id="operator">
      <button id="add" value="+" onClick={props.handlerOperator}>
        +
      </button>
      <button id="subtract" value="-" onClick={props.handlerOperator}>
        -
      </button>
      <button id="multiply" value="x" onClick={props.handlerOperator}>
        x
      </button>
      <button id="divide" value="/" onClick={props.handlerOperator}>
        /
      </button>
    </div>
  );
};
class Display extends React.Component {
  render() {
    // console.log(this.props.formula);
    // console.log(this.props.currentValue);
    return (
      <div id="contain-display">
        <p id="formula">{this.props.formula}</p>
        <p id="display">{this.props.currentValue}</p>
      </div>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: "0",
      prevValue: "0",
      formula: "",
      currentSign: "pos",
      lastClick: "",
      on: true,
      // evaluated: false,
    };
  }

  handlerSwitch = (e) => {
    this.setState(() => {
      if (this.state.on) {
        e.target = "on";
        return { on: false, currentValue: "", prevValue: "", formula: "" };
      } else {
        return { on: true, currentValue: "0", prevValue: "0", formula: "" };
      }
    });
  };

  clear = () => {
    if (this.state.on) {
      this.setState({
        currentValue: "0",
        prevValue: "0",
        formula: "",
        currentSign: "pos",
        lastClick: "",
        evaluated: false,
      });
    }
  };

  handlerDelete = () => {
    if (this.state.on) {
      this.setState({
        formula: this.state.formula.slice(0, -1),
        currentValue: this.state.currentValue.slice(0, -1),
      });
    }
  };

  maxDigitWarning = () => {
    //canh bao neu so qua lon
    if (this.state.on) {
      this.setState({
        currentValue: "Warming Digit Limit",
        prevValue: this.state.currentValue,
      });
      setTimeout(
        () => this.setState({ currentValue: this.state.prevValue }),
        1000
      );
    }
  };

  handlerNumber = (e) => {
    if (this.state.on) {
      if (!this.state.currentValue.includes("Limit")) {
        //neu k bi bao ghan chuoi so thi ms thuc hien
        const { currentValue, formula, evaluated } = this.state;
        const value = e.target.value; //gt nut dc nhan
        this.setState({ evaluated: false });
        if (currentValue.length > 21) {
          //nhap day so dai qua 21
          this.maxDigitWarning();
        } else if (evaluated) {
          this.setState({
            currentValue: value,
            formula: value !== "0" ? value : "",
          });
        } else {
          this.setState({
            currentValue:
              currentValue === "0" || isOperator.test(currentValue)
                ? value
                : currentValue + value,
            formula:
              currentValue === "0" && value === "0"
                ? formula === ""
                  ? value
                  : formula
                : /([^.0-9]0|^0)$/.test(formula) //neu bat dau bang 0  hoac bdau bang.0->9 ket thuc boi 0 (0.9990) thi
                ? //xoa so 0 thua do ra khoi chuoi
                  formula.slice(0, -1) + value
                : formula + value,
          });
        }
      }
    }
  };
  handlerOperator = (e) => {
    if (this.state.on) {
      if (!this.state.currentValue.includes("Limit")) {
        //neu k bi bao ghan chuoi so thi ms thuc hien
        const value = e.target.value; //value la toan tu
        const { formula, prevValue, evaluated } = this.state;
        this.setState({ currentValue: value, evaluated: false });
        if (evaluated) {
          this.setState({ formula: prevValue + value });
        } else if (!endsWithOperator.test(formula)) {
          //k kt boi toan tu(vd 7/8)
          this.setState({ prevValue: formula, formula: formula + value });
        } else if (!endsWithNegativeSign.test(formula)) {
          //ket thuc = tt,k ket thuc boi dau am (12/)
          this.setState({
            formula:
              (endsWithNegativeSign.test(formula + value) //(truong hop 12/-,12+-)
                ? formula //giu nguyen(formula+value)
                : prevValue) + value, //doi sang dau vua nhan(12/ value la dau x thi doi thanh 12x)
          });
        } else if (value !== "-") {
          //toan tu eo phai dau am
          this.setState({ formula: prevValue + value }); //doi sang dau kia
        }
      }
    }
  };

  handlerDecimal = () => {
    if (this.state.on) {
      if (this.state.evaluated === true) {
        this.setState({ currentValue: "0.", formula: "0.", evaluated: false });
      } else if (
        !this.state.currentValue.includes(".") &&
        !this.state.currentValue.includes("Limit")
      ) {
        this.setState({ evaluated: false });
        if (this.state.currentValue.length > 21) {
          this.maxDigitWarning();
        } else if (
          endsWithOperator.test(this.state.formula) ||
          (this.state.currentValue === "0" && this.state.formula === "") //tang thai ban dau chua nhap j ca hoac sau toan tu nhap luon dau .
        ) {
          this.setState({
            currentValue: "0.",
            formula: this.state.formula + "0.",
          }); //them 0 trc .(vd . hoac 9+. thanh 0. va 9+0.)
        } else {
          // console.log(this.state.formula.match(/(-?\d+\.?\d*)$/));
          // console.log(this.state.formula.match(/(-?\d+\.?\d*)$/)[0]);
          this.setState({
            //khong cho phep 2 dau cham thuc tren 1 so
            currentValue: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + ".", //( tim chuoi co dau . thuc  cuoi vd (1.2.2=> lays 2.2 ))
            formula: this.state.formula + ".",
          });
        }
      }
    }
  };
  handlerEvaluate = (e) => {
    if (this.state.on) {
      //dang bat
      // tinh ket qua, (dau = )
      if (!this.state.currentValue.includes("Limit")) {
        //neu k bi bao ghan chuoi so thi ms tinh
        let expression = this.state.formula; //bieu thuc can tinh gia tri
        while (endsWithOperator.test(expression)) {
          //xoa het toan tu thua sau bieu thuc
          expression = expression.slice(0, -1);
        }
        expression = expression //doi cac phep tinh trong chuoi bthuc
          .replace(/x/g, "*")
          .replace(/-/g, "-")
          .replace("--", "+0+0+0+0+0+0+"); // -- thanh + nhung doi thanh day 0+0+0+0+0+0+ de sau doi lai cho viec hien thi
        //lam tron chinh xac toi 13 so o phan thuc
        let answer =
          Math.round(1000000000000 * eval(expression)) / 1000000000000;
        this.setState({
          currentValue: answer.toString(),
          formula:
            expression //doi lai bt sau khi tinh toan de hthi
              .replace(/\*/g, "x")
              .replace(/-/g, "-")
              .replace("+0+0+0+0+0+0+", "--")
              .replace(/(x|\/|\+)-/, "$1-")
              .replace(/^-/, "-") + // doi dau tru thanh dau am(– => -)
            "=" +
            answer,
          prevValue: answer,
          evaluated: true,
        });
      }
    }
  };

  render() {
    return (
      <div id="contain">
        <Display
          currentValue={this.state.currentValue}
          formula={this.state.formula}
        />
        <Keyboard
          clear={this.clear}
          handlerNumber={this.handlerNumber}
          handlerOperator={this.handlerOperator}
          handlerDecimal={this.handlerDecimal}
          handlerEvaluate={this.handlerEvaluate}
          handlerDelete={this.handlerDelete}
          handlerSwitch={this.handlerSwitch}
        />
      </div>
    );
  }
}
export default Calculator;
