import React from "react";
import Form from "./formComponent";

class EmployeeItem extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         id:''
    //     }
    // }
    delete = (id) => {
        this.props.delete(id);
    }

    edit = (id) => {
        this.props.edit(id);
        
    }

    render() {
        let { employee, index } = this.props;
        
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{employee.employeeId}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.age}</td>
                <td>
                    <button id="btn-fix"
                        onClick={() => this.edit(employee.id)}>sua</button>
                    <button id="btn-delete"
                        onClick={() => this.delete(employee.id)}>xoa</button>
                </td>
            </tr >
        );
    }
}
export default EmployeeItem;
