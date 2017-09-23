import React, {Component} from 'react';
import BasicStore from '../stores/basic-store';
import {Redirect} from 'react-router-dom';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: BasicStore.userRole
        };
        this.adminRole = "ADMIN";
    }

    componentWillMount() {
        BasicStore.on("change", () => {
            this.setState({role: BasicStore.userRole})
        })
    }

    render() {
        const isAdmin = this.state.role === this.adminRole;
        return (
            <h2>Set Role Permission!!</h2>
        )
    }
}

export default Settings