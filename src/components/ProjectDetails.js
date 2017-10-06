import React, {Component} from "react";
import {Redirect, Link, Switch, Route} from 'react-router-dom';

import BasicStore from '../stores/basic-store';
import IssuesList from "./IssuesList";


class ProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectSlug: this.props.match.params.slug,
            project: "",
            notFound: false
        };
    }

    getDetails() {
        const url = BasicStore.makeUrl('api/v1/pms/projects/' + this.state.projectSlug + '/');
        const payload = {
            method: 'GET',
            headers: BasicStore.headers
        };
        fetch(url, payload).then((response) => {
            if (response.status === 404) {
                this.setState({notFound: true});
            }
            return response.json();
        }).then((data) => {
            // set loading false for stop loading feature
            this.setState({loading: false, project: data});
        }).catch((err) => {
            console.log(err);
        });
    }

    componentWillMount() {
        // Set projectSlug to state
        this.setState({projectSlug: this.props.match.params.slug});
        console.log(this.state.projectSlug);
        this.getDetails();
    }

    render() {
        // if (this.state.notFound) {
        //     return <Redirect to={BasicStore.urlPaths.notFound}/>
        // }

        return (
            <div className="project-details container-fluid">
                <div className="project-title">
                    <span>{this.state.project.name}</span> <br/>
                    <a href={this.state.project.website} target="_blank">{this.state.project.website}</a>
                </div>
                {/* This is inline navigation bar */}
                <div className="float-right">
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <Link className="nav-link active" to="">Issues</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="">Issues</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="">Issues</Link>
                        </li>
                    </ul>
                </div>
                <div className="jumbotron">
                    <h4>Description</h4>
                    <p>{this.state.project.description}</p>
                    <hr/>
                    {/* TODO: Here will add tab view */}
                    {/* Defining Route */}
                    <Switch>
                        {/* Defining urls */}
                        <Route exact path={"/projects/" + this.state.projectSlug + "/issues"} component={IssuesList}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default ProjectDetails;