import React, {Component} from "react";
import BasicStore from "../stores/basic-store";
import LogListView from "./LogListView";
import {withRouter} from "react-router-dom";
import qs from "query-string";

class ActivityLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            logs: [],
            q: "",
        };
        this.testFilter = this.testFilter.bind(this);
        this.testInputChange = this.testInputChange.bind(this);
    }

    testInputChange(e) {
        const val = e.target.value;
        this.setState({q: val});
        this.props.history.push("?q=" + val);
        e.preventDefault();
    }

    testFilter(e) {
        const parsed = qs.parse(this.props.location.search);
        this.setState({q: parsed.q});
        this.getActivityLog();
        e.preventDefault();
    }

    getActivityLog() {
        const parsed = qs.parse(this.props.location.search);
        let q = parsed.q !== undefined ? parsed.q:"";
        const url = BasicStore.makeUrl('api/v1/pms/activity-logs/?q=' + q);
        const payload = {
            method: 'GET',
            headers: BasicStore.headers
        };
        fetch(url, payload).then((response) => {
            return response.json();
        }).then((data) => {
            // set loading false for stop loading feature
            this.setState({loading: false, logs: data.results});
        }).catch((err) => {
            console.log(err);
        });
    }

    componentWillMount() {
        this.getActivityLog();
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Activities...</h1>
                <div>
                    <input type="text" onChange={this.testInputChange} value={this.state.q}/>
                    <button className="m-1 btn btn-xs btn-outline-danger" onClick={this.testFilter}>Update</button>
                </div>
                <LogListView logs={this.state.logs} loading={this.state.loading}/>
            </div>
        )
    }
}

export default withRouter(ActivityLog);