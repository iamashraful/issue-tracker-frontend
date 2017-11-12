import React, {Component} from 'react';
import BasicStore from '../../stores/basic-store';
import NoAccess from "../utility/NoAccess";
import Select from 'react-select';
import IssueTableView from "./IssueTableView";
import {Link} from "react-router-dom";


class IssuesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            issues: [],
            selectedProject: [],
            projectSelectData: [],
            issueParams: "",
        };
        this.contentVisibility = this.contentVisibility.bind(this);
        this.onProjectSelect = this.onProjectSelect.bind(this);
        this.reloadData = this.reloadData.bind(this);
    }

    contentVisibility(val) {
        this.setState({displayClass: val});
    }

    getIssues(params) {
        const url = BasicStore.makeUrl('api/v1/pms/issues/' + '?' + params);
        const payload = {
            method: 'GET',
            headers: BasicStore.headers
        };
        fetch(url, payload).then((response) => {
            return response.json();
        }).then((data) => {
            // set loading false for stop loading feature
            this.setState({loading: false, issues: data.results});
            console.log(data.results);
        }).catch((err) => {
            console.log(err);
        });
    }

    componentWillMount() {
        this.getIssues();
        if (BasicStore.projects.length === 0) {
            BasicStore.fetchProjects();
        }
    }

    reloadData(e) {
        this.getIssues(this.state.issueParams);
        e.preventDefault();
    }

    onProjectSelect(val) {
        if (val !== null) {
            let d = [];
            let str = "";
            val.map(item => {
                d.push(item.value);
                str += item.value + ",";
            });
            this.setState({selectedProject: d, issueParams: 'project=' + str});
        }
        else {
            this.setState({selectedProject: []});
        }
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
                        <div style={{paddingTop: '2.5rem'}}>
                            <button
                                className="m-l-1 pull-right btn btn-info"
                                onClick={this.reloadData}
                            >Reload
                            </button>
                            <Select
                                className="pull-right w-33ps"
                                multi={true}
                                name="form-field-name"
                                value={this.state.selectedProject}
                                options={BasicStore.projectsSelectFormat}
                                onChange={this.onProjectSelect}
                            />
                        </div>
                    </div>
                    {/* Here will be table view for issues List*/}
                    <IssueTableView
                        style={{paddingTop: '1rem'}}
                        issues={this.state.issues}
                        loading={this.state.loading}
                    />
                </div>
            </div>
        )
    }

}

export default IssuesList;