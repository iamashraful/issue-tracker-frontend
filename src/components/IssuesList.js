import React, {Component} from 'react';
import BasicStore from '../stores/basic-store';
import NoAccess from "./NoAccess";


class IssuesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            issues: []
        };
        this.contentVisibility.bind(this);
    }

    contentVisibility(val) {
        this.setState({displayClass: val});
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
        let mainContentClass = 'container-fluid ';
        mainContentClass += this.state.displayClass;

        return (
            <div className={mainContentClass}>
                <NoAccess displayCSS={this.contentVisibility.bind(this)}/>
                <h1>Issue List</h1>
            </div>
        )
    }

}

export default IssuesList;