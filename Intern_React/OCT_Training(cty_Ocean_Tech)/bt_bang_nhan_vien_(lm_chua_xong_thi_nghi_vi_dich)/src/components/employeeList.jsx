import React from "react";
import "../styles/employeeList.css";

class EmployeeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: ''
        }
    }

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;

        this.props.filter(
            name === 'filterName' ? value : this.state.filterName
        );
        this.setState({
            [name]: value
        });
    }

    render() {
        let { filterName } = this.state;

        return (
            <div>
                <label id="filter-label" htmlFor="filter-name">Loc theo ten:
                <input type="text" id="filter-name" placeholder="ten nhan vien"
                    name="filterName"
                    value={filterName}
                    onChange={this.onChange}
                />
                </label>
                <table>
                    <thead>
                        <tr>
                            <th>stt</th>
                            <th>Ma Nhan Vien</th>
                            <th>Ten</th>
                            <th>Email</th>
                            <th>So Dien Thoai</th>
                            <th>Tuoi</th>
                            <th>Sua/Xoa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.children}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default EmployeeList;
