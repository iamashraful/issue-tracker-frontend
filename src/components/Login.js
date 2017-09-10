import React, {Component} from 'react';
import BasicStore from '../stores/basic-store';
import 'whatwg-fetch';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            data: {
                non_fields_error: ''
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    makeUrl(path) {
        return BasicStore.apiUrl + path;
    }

    handleSubmit(event) {
        const url = this.makeUrl('api/v1/core/login/');
        const payload = {
            method: 'POST',
            headers: BasicStore.headers,
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        };
        fetch(url, payload).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.token) {
                BasicStore.setToken(data.token);
                // Clear username & password from state
                this.setState({
                    username: '',
                    password: '',
                    data: {
                        non_fields_error: ''
                    }
                });
                // TODO: This is very badly hard coded. I have plan to change it with another state.
                window.location = '/#/dashboard';
            }
            else {
                this.setState({data: data});
            }
        }).catch((err) => {
            console.log(err);
        });
        event.preventDefault();
    }

    render() {
        const cssClasses = "form-control";
        const errCssClasses = 'alert alert-danger ';
        const displayError = this.state.data.non_fields_error ? errCssClasses + 'd-block' : errCssClasses + 'd-none';

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 ml-auto mr-auto mt-4">
                        <div className="card">
                            <div className="card-header">Please Sign In</div>
                            <div className="card-body">
                                <form onSubmit={this.handleSubmit}>
                                    <fieldset className="p-4">
                                        <div className="form-group">
                                            <input className={cssClasses} placeholder="Username" type="text"
                                                   onChange={(event) => this.setState({username: event.target.value})}
                                                   value={this.state.username} required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input className={cssClasses} placeholder="Password" type="password"
                                                   onChange={(event) => this.setState({password: event.target.value})}
                                                   value={this.state.password} required
                                            />
                                        </div>
                                        <div className={displayError}>
                                            <small>{this.state.data.non_fields_error}</small>
                                        </div>
                                        <button className="btn btn-md btn-block btn-success">Login</button>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;