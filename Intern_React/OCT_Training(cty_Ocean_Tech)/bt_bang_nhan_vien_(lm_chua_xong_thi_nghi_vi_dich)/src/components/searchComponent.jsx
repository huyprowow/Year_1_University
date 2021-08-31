import React from "react";
import "../styles/searchComponent.css";
class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }

    onChangeHandler = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    }

    search = () => {
        this.props.search(this.state.keyword);
    }

    render() {
        let { keyword } = this.state;
        return (
            <div>
                <label id="search-label" htmlFor="search">Tim nhan vien:
                    <input type="number" id="search" placeholder="ma nhan vien"
                        name="keyword"
                        value={keyword}
                        onChange={this.onChangeHandler}
                    />
                </label>
                <button id="search-btn"
                    onClick={this.search}>tim</button>
            </div>
        );
    }
}
export default Search;
