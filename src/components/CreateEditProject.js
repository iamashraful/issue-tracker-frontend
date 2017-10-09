import React, {Component} from "react";
import BasicStore from "../stores/basic-store";
import {Link} from "react-router-dom";

class CreateEditProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //UI related state
            loading: true,
            // Project states
            name: "",
            description: "",
            website: "",
            documents: "",
            // API Response state
            projectPostResponse: "",
            statusCode: 400,
            success: false,
        };
        this.handleSaveProject.bind(this);
    }

    handleSaveProject(event) {
        const postBody = JSON.stringify({
            name: this.state.name,
            description: this.state.description,
            website: this.state.website,
            documents: this.state.documents,
        });
        // Here will be save API call
        const url = BasicStore.makeUrl('api/v1/pms/projects/');
        const payload = {
            method: 'POST',
            headers: BasicStore.headers,
            body: postBody
        };
        fetch(url, payload).then((response) => {
            if (response.status === 401) {
                this.setState({statusCode: response.status, loading: false});
            }
            if (response.status === 201) {
                this.setState({statusCode: response.status, success: true, loading: false});
            }
            return response.json();
        }).then((data) => {
            // set loading false for stop loading feature
            this.setState({loading: false, projectPostResponse: data});
            console.log(this.state.projectPostResponse);
        }).catch((err) => {
            console.log(err);
        });
        event.preventDefault();
    }

    render() {
        let cssClasses = "form-control ";
        let successMgs = "text-center alert alert-success ";
        successMgs += this.state.success ? "d-block" : "d-none";
        if (this.state.success) {
            setTimeout(() => {
                return <Link to={BasicStore.urlPaths.projects}/>
            }, 10000);
        }

        return (
            <div className="container">
                <h2 className="text-center text-danger">Create new Project</h2>
                <hr/>
                <h4 className={successMgs}>Project created successfully.</h4>
                <form onSubmit={this.handleSaveProject.bind(this)}>
                    <fieldset className="p-l-r-20p">
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
                        <button className="btn btn-primary pull-right custom-btn-padding">Save</button>
                    </fieldset>

                </form>
            </div>
        )
    }
}

export default CreateEditProject;