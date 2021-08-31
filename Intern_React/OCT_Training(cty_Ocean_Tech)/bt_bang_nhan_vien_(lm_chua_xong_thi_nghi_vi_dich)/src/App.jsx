import React from "react";
import Search from "./components/searchComponent";
import Add from "./components/addComponent";
import EmployeeList from "./components/employeeList";
import EmployeeItem from "./components/employeeItem";
import callApi from "./apis/callApi";
import Form from "./components/formComponent";
import { ExportCSV } from "./components/ExportCSV";
import Pagination from 'react-js-pagination'
import "./App.css";

let idEmployeeEdit = 0;
class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      employees: [],//mang data
      //form
      showEditForm: false,
      //search
      keyword: '',
      //filter
      filterName: '',
      //pagination
      totalItemsCount: 26,
      activePage: 1,
      itemsCountPerPage: 5,
      pageRangeDisplayed: 5
    }
  }

  componentDidMount() {
    this.handlerPageChange(1);
  }
  handlerPageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    callApi(`employees?limit=${this.state.itemsCountPerPage}&page=${pageNumber}`, 'GET', null)
      .then((response) => {
        console.log(response);//log response ktra data
        this.setState({
          employees: response.data
        });
        this.setState({ activePage: pageNumber });
      })
  }

  edit = (id) => {
    let { employees } = this.state;
    this.setState({ showEditForm: true });
    console.log(`${id} la id truyen cho form de sua`);
    //employeeEdit = this.findEmployeeById(employees, id);
    idEmployeeEdit = id;

    console.log(idEmployeeEdit);
  }

  findEmployeeById = (employees, id) => {
    let result = null;//vi tri index cua id trong mang state
    employees.forEach((employee) => {
      if (employee.id === id) {
        result = employee;
      }
    });
    return result;
  }

  filter = (filterName) => {
    // console.log(filterName); log tên nhập vào
    this.setState({
      filterName: filterName.toLowerCase()
    })
  }

  search = (keyword) => {
    this.setState({ keyword: parseInt(keyword) });
  }

  delete = (id) => {
    let { employees } = this.state;
    console.log(id);//log id can xoa
    callApi(`employees/${id}`, 'DELETE', null)
      .then((response) => {
        //xoa tren sever nhung can load lai
        console.log(response);//log response ktra data
        //da xoa tren sever nhung tren mang state van con nen h xoa o mang state
        if (response.status === 200) {//phan hoi Ok
          let index = this.findIndex(employees, id)
          if (index !== -1) {
            employees.splice(index, 1);
            this.setState({
              employees: employees
            });
          }
        }
      })
  }

  findIndex = (employees, id) => {
    let result = -1;//vi tri index cua id trong mang state
    employees.forEach((employee, index) => {
      if (employee.id === id) {
        result = index;
      }
    });
    return result;
  }
  showEmployees(employees) {
    let result = null;
    if (employees.length > 0) {
      result = employees.map((employee, index) => {
        return (
          <EmployeeItem
            key={index}
            employee={employee}
            index={index}
            delete={this.delete}
            edit={this.edit}
          />
        );
      })
    }
    return result;
  }


  render() {
    let employees = this.state.employees;
    // // let {employees}=this.state;

    //loc nhan vien
    let filterName = this.state.filterName;
    if (filterName) {
      employees = employees.filter((employee) => {
        return employee.name.toLowerCase().indexOf(filterName) !== -1;
      });
    }

    //tim nhan vien
    let keyword = this.state.keyword;
    // console.log(keyword); log key word
    if (keyword) {
      employees = employees.filter((employee) => {
        // console.log(employee.employeeId);
        //neu ma nhan vien bang voi tu khoa thi tra ve nhan vien
        if (employee.employeeId === keyword) {
          return employee;
        }
      });
    }

    let form;
    if (this.state.showEditForm) {
      // idEmployeeEdit=id;
      form = <Form id={idEmployeeEdit} />;
    }

    return (
      <div className="container">
        <Search search={this.search} />
        {form}
        <Add />
        <ExportCSV csvData={this.state.employees} fileName={this.state.fileName} />
        <EmployeeList filter={this.filter}>
          {this.showEmployees(employees)}
        </EmployeeList>
        <Pagination
          totalItemsCount={this.state.totalItemsCount}
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCountPerPage}
          pageRangeDisplayed={this.state.pageRangeDisplayed}
          onChange={this.handlerPageChange}
          className='pagination'
        ></Pagination>
      </div>
    );
  }
}

export default App;
