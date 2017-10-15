import React, {Component} from "react";
import BasicStore from "../stores/basic-store";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class CreateEditIssue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //UI related state
            loading: false,
            projectSelectData: [
                {text: "Google", id: 1},
                {text: "Facebook", id: 2},
                {text: "MicroSoft", id: 3},
            ],
            // Issue states
            title: "",
            project: "",
            description: "",
            documents: "",
            // API Response state
            issuePostResponse: "",
            statusCode: 400,
            // Error Response
            success: false,
            errorData: [],
        };
        this.handleSaveIssue.bind(this);
        this.onProjectSelect = this.onProjectSelect.bind(this);
        this.onOpenProjectSelect = this.onOpenProjectSelect.bind(this);
    }

    componentWillMount() {
        // If projects are empty at the store then it will call the API again
        if(BasicStore.projects.length === 0) {
            BasicStore.fetchProjects();
        }
    }

    onOpenProjectSelect(e) {
        const projects = BasicStore.projects;
        let data = [];
        projects.map(pr => {
            data.push({label: pr.name, value: pr.id});
        });
        this.setState({projectSelectData: data});
        // e.preventDefault();
    }

    onProjectSelect(val) {
        if(val !== null) {
            this.setState({project: val.value});
        } else{
            this.setState({project: ""});
        }
    }

    handleSaveIssue(event) {
        this.setState({loading: true});
        const postBody = JSON.stringify({
            title: this.state.title,
            description: this.state.description,
            website: this.state.website,
        });

        // Here will be save API call
        const url = BasicStore.makeUrl('api/v1/pms/issues/');
        const payload = {
            method: 'POST',
            headers: BasicStore.headers,
            body: postBody
        };
        fetch(url, payload).then((response) => {
            if (response.status === 400) {
                this.setState({statusCode: response.status, loading: false});
            }
            if (response.status === 401) {
                this.setState({statusCode: response.status, loading: false});
            }
            if (response.status === 201) {
                this.setState({statusCode: response.status, success: true, loading: false});
            }
            return response.json();
        }).then((data) => {
            if(!this.state.success) {
                this.setState({errorData: data});
            }
            if(this.state.success) {
                this.setState({loading: false, issuePostResponse: data, errorData: []});
            }
        }).catch((err) => {
            console.log(err);
        });
        event.preventDefault();
    }

    render() {
        let cssClasses = "form-control ";
        let successMgs = "text-center alert alert-success ";
        const savingButton = this.state.loading ? 'd-block' : 'd-none';
        const saveButton = this.state.loading ? 'd-none' : 'd-block';
        successMgs += this.state.success ? "d-block" : "d-none";

        if(this.state.success) {
            setTimeout(function() {
                window.location.assign("/#" + BasicStore.urlPaths.issues);
            }.bind(this), 3000);
        }

        return (
            <div className="container">
                <h2 className="text-center text-danger">Create new Issue</h2>
                <hr/>
                <h4 className={successMgs}>Issue created successfully.</h4>
                <form onSubmit={this.handleSaveIssue.bind(this)}>
                    <fieldset className="p-l-r-20p">
                        <p
                        className={this.state.errorData.non_fields_errors !== undefined ? 'alert alert-danger' : ''}>
                        {this.state.errorData.non_fields_errors}
                        </p>
                        <div className="form-group">
                            <label>Title</label> <br/>
                            <span className="text-danger">{this.state.errorData.title}</span>
                            <input className={cssClasses} placeholder="Name of Project" type="text"
                                   onChange={(event) => this.setState({title: event.target.value})}
                                   value={this.state.title}
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <br/>
                            <span className="text-danger">{this.state.errorData.description}</span>
                            <textarea className={cssClasses} placeholder="Description of Project"
                                      type="text" value={this.state.description} rows="5"
                                      onChange={(event) => this.setState({description: event.target.value})}

                            />
                        </div>
                        <div className="form-group">
                            <label>Project</label> <br/>
                            <Select
                                name="form-field-name"
                                value={this.state.project}
                                options={this.state.projectSelectData}
                                onChange={this.onProjectSelect}
                                onOpen={this.onOpenProjectSelect}
                            />
                        </div>
                        <button className="btn btn-primary pull-right custom-btn-padding">
                            <span className={saveButton}>Save</span>
                            <span className={savingButton}>Please Wait...
                                <i className="fa fa-spinner fa-spin"/>
                            </span>
                        </button>
                    </fieldset>

                </form>
            </div>
        )
    }
}

export default CreateEditIssue;