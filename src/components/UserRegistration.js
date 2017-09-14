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
            isAuth: BasicStore.isAuthentication
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log(this.state);
        // POST user for registration
        const url = this.makeUrl('api/v1/core/registration/');
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
            return response.json();
        }).then((data) => {
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
        const cssClasses = "form-control";
        if(this.state.isAuth) {
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
                                            <div className="form-group">
                                                <input className={cssClasses} placeholder="Confirm Password" type="password"
                                                       onChange={(event) => this.setState({confirm_password: event.target.value})}
                                                       value={this.state.confirm_password} required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input className={cssClasses} placeholder="Email" type="email"
                                                       onChange={(event) => this.setState({email: event.target.value})}
                                                       value={this.state.email} required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <input className={cssClasses} placeholder="Gender" type="text"
                                                       onChange={(event) => this.setState({gender: event.target.value})}
                                                       value={this.state.gender} required
                                                />
                                            </div>
                                            <button className="btn btn-md btn-block btn-success">
                                                Register
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