import React from "react";
import "./formComponent.css";
import callApi from "./callApi";
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            inputEmployeeId: '',
            inputName: '',
            inputEmail: '',
            inputPhone: '',
            inputAge: ''
        };
    }

    componentDidMount() {
        // trc khi render ra nhan id tu prop cho viec sua
        // let { match } = this.props;
        // if (match) {
        //     let id = match.params.id;
        //     this.setState({
        //         id: id
        //     });
        // console.log(id);
        // }

        let id = this.props;
        console.log(id);
        this.setState({id:this.props});
    }

    onChangeHandler = (e) => {
        let target = e.target;
        let name = target.name;//e.target.value
        let value = target.value;
        this.setState({
            [name]: value
        });
    }

    saveHandler = (e) => {
        // e.preventDefault();
        let { inputEmployeeId, inputName, inputEmail, inputPhone, inputAge } = this.state;
        // console.log(this.state);//log ra thong tin vua submit
        // if (!id) {//truong hop sua neu id da co
        //     console.log(id);
        //     callApi(`employees/${id}`, 'PUT', {
        //         employeeId: inputEmployeeId,// employeeId:this.state.inputEmployeeId
        //         name: inputName,
        //         email: inputEmail,
        //         phone: inputPhone,
        //         age: inputAge
        //     }).then((response) => {
        //         console.log(response);
        //         this.componentDidMount(id);
        //     });
        // } else {
        // }
        callApi('employees', 'POST', {
            employeeId: inputEmployeeId,// employeeId:this.state.inputEmployeeId
            name: inputName,
            email: inputEmail,
            phone: inputPhone,
            age: inputAge
        }).then((response) => {
            console.log(response);
            this.componentDidMount();
        });
    }

    render() {
        let { inputEmployeeId, inputName, inputEmail, inputPhone, inputAge } = this.state;
        return (
            <div>
                <form onSubmit={this.saveHandler} id="form">
                    <button id="btn-del" onClick={this.exitForm}>x</button>
                    <div id="contain-input">
                        <label htmlFor="employee-id">Ma Nhan Vien</label>
                        <input type="number" id="employee-id"
                            name="inputEmployeeId"
                            value={inputEmployeeId}
                            onChange={this.onChangeHandler}
                        />

                        <label htmlFor="employee-name">Ten</label>
                        <input type="text" id="employee-name"
                            name="inputName"
                            value={inputName}
                            onChange={this.onChangeHandler}
                        />

                        <label htmlFor="employee-email">Email</label>
                        <input type="email" id="employee-email" placeholder="__@__.com"
                            name="inputEmail"
                            value={inputEmail}
                            onChange={this.onChangeHandler}
                        />

                        <label htmlFor="employee-phone">So dien thoai</label>
                        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="employee-phone" placeholder="012-345-6789"
                            name="inputPhone"
                            value={inputPhone}
                            onChange={this.onChangeHandler}
                        />

                        <label htmlFor="employee-age">Tuoi</label>
                        <input type="number" id="employee-age"
                            name="inputAge"
                            value={inputAge}
                            onChange={this.onChangeHandler}
                        />
                    </div>
                    <button type="submit" id="btn-save" >Luu</button>
                </form>
            </div>
        );
    }
}
export default Form;