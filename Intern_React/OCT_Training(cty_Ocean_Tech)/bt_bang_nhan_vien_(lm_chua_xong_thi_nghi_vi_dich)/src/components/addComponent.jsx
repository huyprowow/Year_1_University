import React from "react";
import Form from "./formComponent";
import "../styles/addComponent.css"
class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false
        };
    }
    //them form them nhan vien,hien khi an nut
    addEmployee = () => {
        console.log(this.state.showForm);
        this.setState({ showForm: true });
    };

    render() {
        //viet theem form
        let form;
        if (this.state.showForm) {
            form = <Form />;
        }
        return (
            <div>
                <button id="btn-add" onClick={this.addEmployee}>them nhan vien</button>
                {form}
            </div>
        );
    }

}
export default Add;
