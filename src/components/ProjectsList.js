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

            // Project states
            name: "",
            description: "",
            website: "",
            documents: "",

            // Business Logic related states
            projects: [],
            statusCode: 0,
        };
        this.contentVisibility.bind(this);
        this.handleSaveProject.bind(this);
    }

    contentVisibility(val) {
        this.setState({displayClass: val});
    }

    handleSaveProject(event) {
        // Here will be save API call
        event.preventDefault();
    }

    getProjectList() {
        const url = BasicStore.makeUrl('api/v1/pms/projects/');
        const payload = {
            method: 'GET',
            headers: BasicStore.headers
        };
        fetch(url, payload).then((response) => {
            if (response.status === 401) {
                this.setState({statusCode: response.status, loading: false});
            }
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
        // Set loading false when not necessary
        if (this.state.statusCode === 401) {
            this.setState({loading: false});
        }
    }

    render() {
        let mainContentClass = 'container-fluid ';
        mainContentClass += this.state.displayClass;
        let cssClasses = "form-control ";

        if (this.state.loading) {
            return (
                <div className="container-loading text-center align-middle">
                    <i className="fa fa-spinner fa-spin" aria-hidden="true"/>
                </div>
            )
        }

        if (this.state.projects.length === 0) {
            return (
                <div className={mainContentClass}>
                    <h1 className="text-center text-danger p-5">No projects found.</h1>
                </div>
            )
        }

        return (
            <div>
                <NoAccess displayCSS={this.contentVisibility.bind(this)}/>
                <div className={mainContentClass}>
                    <div className="action-view">
                        {/* Action buttons view */}
                        <button
                            className="btn btn-primary p-l-r-1 pull-right"
                            data-toggle="modal" data-target="#myModal">
                            New
                        </button>
                    </div>

                    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog"
                         aria-labelledby="myModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="myModalLabel">Create new project</h4>
                                    <button type="button" className="close" data-dismiss="modal">
                                        <span aria-hidden="true">&times;</span>
                                        <span className="sr-only">Close</span>
                                    </button>

                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleSaveProject.bind(this)}>
                                        <fieldset className="p-4">
                                            {/*<p*/}
                                            {/*className={this.state.errorData.non_fields_errors !== undefined ? 'alert alert-danger' : ''}>*/}
                                            {/*{this.state.errorData.non_fields_errors}*/}
                                            {/*</p>*/}
                                            <div className="form-group">
                                                <label>Name</label>
                                                <input className={cssClasses} placeholder="Name of Project" type="text"
                                                       onChange={(event) => this.setState({name: event.target.value})}
                                                       value={this.state.name} required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Website</label>
                                                <input className={cssClasses} placeholder="Website of Project"
                                                       type="text"
                                                       onChange={(event) => this.setState({website: event.target.value})}
                                                       value={this.state.website}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <textarea className={cssClasses} placeholder="Description of Project"
                                                          type="text" value={this.state.description} required rows="5"
                                                          onChange={(event) => this.setState({description: event.target.value})}

                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Documents</label>
                                                <input className={cssClasses} placeholder="Documents of Project"
                                                       type="file"
                                                       onChange={(event) => this.setState({documents: event.target.value})}
                                                       value={this.state.documents}
                                                />
                                            </div>
                                            <button className="btn btn-primary">Save</button>
                                        </fieldset>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* All the projects card view */}
                    <div className="row p-t-b-1rem">
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