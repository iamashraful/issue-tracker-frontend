import React, {Component} from 'react';
import BasicStore from '../stores/basic-store';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        BasicStore.callApi('http://127.0.0.1:8000/api/v1/core/login/', 'POST', this.state).then((data) => {
            console.log(data);
        });
        event.preventDefault();
    }

    render() {
        const cssClasses = "form-control";
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
                                            <input className={cssClasses}  placeholder="Username" type="text" required
                                                   onChange = {(event) => this.setState({username:event.target.value})}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input className={cssClasses}  placeholder="Password" type="password" required
                                                   onChange = {(event) => this.setState({password:event.target.value})}
                                            />
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