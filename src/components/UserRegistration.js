import React, {Component} from 'react';
import BasicStore from '../stores/basic-store';

class UserRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm_password: '',
            email: '',
            role: '',
            gender: '',
            roles: undefined
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    makeUrl(path) {
        return BasicStore.apiUrl + path;
    }

    componentWillMount() {
        // Get all the roles
        const url = this.makeUrl('api/v1/role-manager/roles/');
        const payload = {
            method: 'GET',
            headers: BasicStore.headers
        };
        fetch(url, payload).then((response) => {
            return response.json();
        }).then((data) => {
            this.setState({roles: data});
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        const cssClasses = "form-control";
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