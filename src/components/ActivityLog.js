import React, {Component} from "react";
import BasicStore from "../stores/basic-store";
import LogListView from "./LogListView";

class ActivityLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            logs: []
        };
    }

    getActivityLog() {
        const url = BasicStore.makeUrl('api/v1/pms/activity-logs/');
        const payload = {
            method: 'GET',
            headers: BasicStore.headers
        };
        fetch(url, payload).then((response) => {
            return response.json();
        }).then((data) => {
            // set loading false for stop loading feature
            this.setState({loading: false, logs: data.results});
            console.log(this.state.logs);
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
                <LogListView/>
            </div>
        )
    }
}

export default ActivityLog