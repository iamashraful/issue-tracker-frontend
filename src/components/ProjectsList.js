import React, {Component} from 'react';
import NoAccess from "./NoAccess";
import {Link} from "react-router-dom";

import BasicStore from '../stores/basic-store';


class ProjectsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Style related states
            displayClass: 'd-block',
            loading: true,

            // Business Logic related states
            projects: [],
        };
        this.contentVisibility.bind(this);
    }

    contentVisibility(val) {
        this.setState({displayClass: val});
    }

    getProjectList() {
        const url = BasicStore.makeUrl('api/v1/pms/projects/');
        const payload = {
            method: 'GET',
            headers: BasicStore.headers
        };
        fetch(url, payload).then((response) => {
            return response.json();
        }).then((data) => {
            // set loading false for stop loading feature
            this.setState({loading: false, projects: data});
        }).catch((err) => {
            console.log(err);
        });
    }

    componentWillMount() {
        // This method will run when a component has mount
        this.getProjectList();
    }

    render() {
        let mainContentClass = 'container ';
        mainContentClass += this.state.displayClass;

        return (
            <div>
                <NoAccess displayCSS={this.contentVisibility.bind(this)}/>
                <div className={mainContentClass}>
                    {/* First Row */}
                    <div className="row">
                        {this.state.projects.map(project =>
                            <div className="col-md-4 col-sm-6" key={project.id}>
                                <div className="card card-outline-primary">
                                    <h5 className="card-header text-truncate">{project.name}</h5>
                                    <div className="card-block">
                                        <h4 className="card-title">{project.website}</h4>
                                        <p className="card-text">{project.description}</p>
                                        <Link
                                            to={BasicStore.urlPaths.projects + '/' + project.slug}
                                            className="btn btn-primary btn-block">Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectsList;