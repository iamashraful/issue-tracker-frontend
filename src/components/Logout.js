import React, {Component} from 'react';
import BasicStore from '../stores/basic-store';
import {Redirect} from 'react-router-dom';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: 400,
            message: 'Please wait...',
            isAuth: BasicStore.isAuthentication
        };
        this.logoutStatusCode = 204;
    }

    makeUrl(path) {
        return BasicStore.apiUrl + path;
    }

    componentWillMount() {
        // Catch `change` event from Store
        BasicStore.on("change", () => {
            this.setState({isAuth: BasicStore.isAuthentication});
        });
        // Call the logout API
        const url = this.makeUrl('api/v1/core/logout/');
        const payload = {
            method: 'POST',
            headers: BasicStore.headers
        };
        console.log(payload);
        fetch(url, payload).then((response) => {
            return response.json();
        }).then((data) => {
            if(data.status === this.logoutStatusCode) {
                this.setState({status: data.status, message: data.message});
                // Empty token from store
                BasicStore.destroyToken();
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        if(!this.state.isAuth) {
            return <Redirect to="/"/>
        }
        return (
            <div className="container">
                <div className="alert alert-info">
                    <div className="text-center">{this.state.message}</div>
                </div>
            </div>
        )
    }
}

export default Logout;