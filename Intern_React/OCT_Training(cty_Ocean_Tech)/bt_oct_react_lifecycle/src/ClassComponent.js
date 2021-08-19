import React from "react";
import ReactDOM from "react-dom";

class ClassComponent extends React.Component {
  //constructor ham tao
  constructor(props) {
    super(props);
    this.state = {
      show: "constructor",
      stateChange: "",
    };
    console.log("Goi dau tien " + this.state.show);
    console.log(this.state);
  }

  //getderived thay doi state, thay doi stageChange tu prop trc khi render
  static getDerivedStateFromProps(props, state) {
    console.log(
      "Contructor goi dau tien, Goi " + state.show + " truoc khi render ra HTML"
    );
    console.log(state);
    console.log("state.stateChange");

    return {
      show: "getDriveStateFromProps",
      stateChange: props.stateChange,
    };
  }

  // this.setState((state,props)=>({
  //   counter:state.counter+props.increament
  // }));

  changeClassComponent = () => {
    this.setState({ stateChange: "Click change stage" });
    //console.log(this.state);
  };
  //goi khi unmount
  componentWillUnmount() {
    alert("ClassComponent unmount");
  }

  //render re HTML vao DOM
  render() {
    console.log(this.state);
    //
    console.log(
      "Contructor goi dau tien, Goi getDerivedStateFromProps truoc khi render ra HTML," +
        this.state.show +
        " HTML"
    );

    //dat truoc return la bi infinity loop
    //this.setState({ show: "render" });

    return (
      <div>
        <p>Xin chào ReactJS, hiển thị HTML sử dụng Class Component</p>
        <button type="button" onClick={this.changeClassComponentState}>
          Doi Class Component props
        </button>
      </div>
    );
  }

  //thay doi sau khi render mout
  componentDidMount() {
    this.setState({ show: "componentDidMount" });
    console.log(this.state);
    //
    console.log(
      "Contructor goi dau tien, Goi getDerivedStateFromProps truoc khi render ra HTML, Render HTML, hien thi HTML xong se nhin thay " +
        this.state.show
    );
    console.log(this.state);

    console.log("thay dong nay sau khi thay giao dien duoc render xong");
  }
}
export default ClassComponent;
