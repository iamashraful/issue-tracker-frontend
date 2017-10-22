import React, {Component} from 'react';
import BasicStore from '../../stores/basic-store';
import NoAccess from "../utility/NoAccess";
import IssueTableView from "./IssueTableView";
import {Link} from "react-router-dom";


class IssuesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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
            this.setState({loading: false, issues: data.results});
        }).catch((err) => {
            console.log(err);
        });
    }

    componentWillMount() {
        this.getIssues();
    }

    render() {
        let mainContentClass = 'container-fluid ';
        mainContentClass += this.state.displayClass;

        return (
            <div className={mainContentClass}>
                <NoAccess displayCSS={this.contentVisibility.bind(this)}/>
                <div>
                    {/* Here will be some filters */}
                </div>
                <div>
                    <div className="action-view">
                        {/* Action buttons view */}
                        <div className="action-buttons">
                            <Link
                                className="btn btn-primary link-button pull-right"
                                to={BasicStore.urlPaths.issues + BasicStore.urlPaths.create}> Create
                            </Link>
                        </div>
                    </div>
                    {/* Here will be table view for issues List*/}
                    <IssueTableView issues={this.state.issues} loading={this.state.loading}/>
                </div>
            </div>
        )
    }

}

export default IssuesList;