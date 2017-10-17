import React, {Component} from "react";
import BasicStore from "../stores/basic-store";
import {Link} from "react-router-dom";
import Safe from "react-safe";

class IssueDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issueId: this.props.match.params.id,
            issue: "",
            notFound: false,
            unAuth: false,
            loading: false,
        };
    }

    getDetails() {
        const url = BasicStore.makeUrl('api/v1/pms/issues/' + this.state.issueId + '/');
        const payload = {
            method: 'GET',
            headers: BasicStore.headers
        };
        fetch(url, payload).then((response) => {
            if (response.status === 404) {
                this.setState({notFound: true});
            }
            if (response.status === 401) {
                this.setState({unAuth: true});
            }
            return response.json();
        }).then((data) => {
            // set loading false for stop loading feature
            this.setState({loading: false, issue: data});
        }).catch((err) => {
            console.log(err);
        });
    }

    componentWillMount() {
        this.getDetails();
    }

    render() {
        console.log(this.state.issue);
        const assigned_to = this.state.issue.assigned_to ? this.state.issue.assigned_to.user.username:"N/A";

        return (
            <div className="container-fluid">
                {/* Action View */}
                <div className="action-view">
                    <span className="issue-title">#{this.state.issue.id}</span>
                    <span className="action-buttons">
                        <Link
                            className="btn btn-success link-button"
                            to={BasicStore.urlPaths.issues + '/' + this.state.issueId + BasicStore.urlPaths.edit}
                        >Edit
                        </Link>
                    </span>
                </div>

                {/* Issue Body */}
                <div className="issue-details jumbotron">
                    <p className="issue-title">{this.state.issue.title}</p>
                    <span className="added-by">Added by,&nbsp;
                        <Link to="/">{this.state.issue.author}</Link>
                    </span>

                    <div className="row p-t-b-1rem">
                        <div className="col-md-6 col-sm-12">
                            <div className="row">
                                <div className="col-md-4">
                                    <p className="key-view">Status</p>
                                </div>
                                <div className="col-md-4">
                                    <p className="value-view">{BasicStore.issueStatusEnum[this.state.issue.status]}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p className="key-view">Tracker</p>
                                </div>
                                <div className="col-md-4">
                                    <p className="value-view">{BasicStore.issueTrackerEnum[this.state.issue.tracker]}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p className="key-view">Priority</p>
                                </div>
                                <div className="col-md-4">
                                    <p className="value-view">{BasicStore.issuePriorityEnum[this.state.issue.priority]}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="row">
                                <div className="col-md-4">
                                    <p className="key-view">Start Date</p>
                                </div>
                                <div className="col-md-4">
                                    <p className="value-view">{this.state.issue.created_at}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p className="key-view">Due Date</p>
                                </div>
                                <div className="col-md-4">
                                    <p className="value-view">{this.state.issue.due_date}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p className="key-view">Assigned to</p>
                                </div>
                                <div className="col-md-4">
                                    <p className="value-view">
                                        <Link to="/">
                                            {assigned_to}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p className="key-view">Progress</p>
                                </div>
                                <div className="col-md-4">
                                    <p className="value-view">{this.state.issue.progress} %</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="b-t"/>
                    {/* Issue Description */}
                    <div className="row p-3">
                        <h5 className="w-100">Description</h5>
                        <Safe.p className="issue-desc">{this.state.issue.description}</Safe.p>
                    </div>
                    <div className="b-t"/>
                    {/* History Section */}
                    <div className="row p-3">
                        <h5 className="w-100">History</h5>
                        <p>History will come later.</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default IssueDetails;