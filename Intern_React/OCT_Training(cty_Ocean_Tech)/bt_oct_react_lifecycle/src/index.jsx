import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import ClassComponent from "./ClassComponent";
import reportWebVitals from "./reportWebVitals";
//import { ReactComponent } from "*.svg";

//import component js tu App.js, App.js chua noi dung ClassComponent
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

//class component
// class ClassHello extends React.Component{
//   render(){
//     return <p>xin chào ReactJS</p>
//   }
// }
// ReactDOM.render(<ClassHello/>,document.querySelector('#root'));

//function component
// function FunctionHello(){
//   return <p>xin chào ReactJS</p>
// }
// ReactDOM.render(<FunctionHello/>,document.querySelector("#root"));

//import tu ClassComponent.js
//ReactDOM.render(<ClassComponent />, document.querySelector("#root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
