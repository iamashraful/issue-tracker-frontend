import React, {Component} from 'react';
import BasicStore from '../stores/basic-store';


class IssuesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            issues: []
        };
    }

    getIssues() {
        const url = BasicStore.makeUrl('api/v1/pms/issues/');
        const payload = {
            method: 'GET',
            headers: BasicStore.headers
        };
        fetch(url, payload).then((response) => {
            return response.json();
        }).then((data) => {
            // set loading false for stop loading feature
            this.setState({loading: false, issues: data});
            console.log(this.state.issues);
        }).catch((err) => {
            console.log(err);
        });
    }

    componentWillMount() {
        // this.getIssues();
    }

    render() {
        return(
            <div>
                <h1>Issue List</h1>
            </div>
        )
    }

}

export default IssuesList;