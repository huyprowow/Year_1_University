// import logo from "./logo.svg";
import React from "react"
import RectDOM from "react-dom"
import "./App.css";
import "./ClassComponent";
import ClassComponent from "./ClassComponent";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { show: true }
  }

  hideClassComponent = () => {
    //goi bang ham mui ten nen this la App,set state show cho state cua class app
    this.setState({ show: false });
  }

  render() {
    let myElement;
    //state.show cua app la true thi hien thi
    if (this.state.show) {
      myElement = (
        <ClassComponent stateChange="Stage value tu App.jsx khong phai tu click vi
      click thay doi stateChange thanh 'Click change state' nhung 
      getDerivedStateFromProps() da thay doi stageChange truoc khi duoc render" />
      );
    }

    return (
      <div className="App">
        <p>xin chào ReactJS</p>
        {myElement}
        <button type="button" onClick={this.hideClassComponent}>Ẩn ClassComponent props</button>
      </div>
    );
  }
  

}
export default App;
