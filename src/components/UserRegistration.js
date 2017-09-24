import React, {Component} from 'react';
import BasicStore from '../stores/basic-store';
import {Redirect} from 'react-router-dom';

class UserRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm_password: '',
            email: '',
            gender: '',
            isAuth: BasicStore.isAuthentication,
            loading: false,
            loadingText: '',
            _hasError: false,
            apiResponseData: {},
            errorData: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    errorMapping(errorResponse) {
        errorResponse.then((data) => {
            this.setState({errorData: data});
            console.log(this.state.errorData);
        })
    }

    handleSubmit(event) {
        // Set loading true
        this.setState({loading: true, loadingText: 'Please Wait...'});
        // POST user for registration
        const url = BasicStore.makeUrl('api/v1/core/registration/');
        const postBody = JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            confirm_password: this.state.confirm_password,
            email: this.state.email,
            gender: this.state.gender
        });
        const payload = {
            method: 'POST',
            headers: BasicStore.headers,
            body: postBody
        };
        fetch(url, payload).then((response) => {
            if (response.status === 400) {
                this.setState({_hasError: true});
                this.errorMapping(response.json())
            }
        }).then((data) => {
            // Set loading false and text empty
            this.setState({loading: false, loadingText: '', apiResponseData: data});
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });
        event.preventDefault();
    }

    makeUrl(path) {
        return BasicStore.apiUrl + path;
    }

    componentWillMount() {
        BasicStore.on("change", () => {
            this.setState({isAuth: BasicStore.isAuthentication});
        });
    }

    render() {
        let cssClasses = "form-control ";
        const registeringButtonViewClass = this.state.loading ? 'd-block' : 'd-none';
        const registerButtonViewClass = this.state.loading ? 'd-none' : 'd-block';

        if (this.state.isAuth) {
            return <Redirect to="/"/>
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5 ml-auto mr-auto mt-4">
                            <div className="card">
                                <div className="card-header">Create new account</div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <fieldset className="p-4">
                                            <p
                                                className={this.state.errorData.non_fields_errors !== undefined ? 'alert alert-danger' : ''}>
                                                {this.state.errorData.non_fields_errors}
                                            </p>
                                            <div className="form-group">
                                                <label>Username</label>
                                                <input className={cssClasses} placeholder="Username" type="text"
                                                       onChange={(event) => this.setState({username: event.target.value})}
                                                       value={this.state.username} required
                                                />
                                                <p className="alert-danger">{this.state.errorData.username}</p>
                                            </div>
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input className={cssClasses} placeholder="Password" type="password"
                                                       onChange={(event) => this.setState({password: event.target.value})}
                                                       value={this.state.password} required
                                                />
                                                <p className="alert-danger">{this.state.errorData.password}</p>
                                            </div>
                                            <div className="form-group">
                                                <label>Confirm Password</label>
                                                <input className={cssClasses} placeholder="Confirm Password"
                                                       type="password"
                                                       onChange={(event) => this.setState({confirm_password: event.target.value})}
                                                       value={this.state.confirm_password} required
                                                />
                                                <p className="alert-danger">{this.state.errorData.confirm_password}</p>
                                            </div>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input className={cssClasses} placeholder="Email" type="email"
                                                       onChange={(event) => this.setState({email: event.target.value})}
                                                       value={this.state.email} required
                                                />
                                                <p className="alert-danger">{this.state.errorData.email}</p>
                                            </div>
                                            <div className="form-group">
                                                <label>Gender</label>
                                                <input className={cssClasses} placeholder="Gender" type="text"
                                                       onChange={(event) => this.setState({gender: event.target.value})}
                                                       value={this.state.gender} required
                                                />
                                                <p className="alert-danger">{this.state.errorData.gender}</p>
                                            </div>
                                            <button className="btn btn-md btn-block btn-success">
                                                <span className={registerButtonViewClass}>Register</span>
                                                <span className={registeringButtonViewClass}>
                                                Please Wait... <i className="fa fa-spinner fa-spin"/>
                                            </span>
                                            </button>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserRegistration;