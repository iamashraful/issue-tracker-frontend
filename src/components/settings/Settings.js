import React, {Component} from 'react';
import BasicStore from '../../stores/basic-store';
import Select from 'react-select';
import AccessControlView from "./AccessControlView";


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: BasicStore.userRole,
            loading: false,
            success: false,
        };
    }

    render() {
        if (this.state.loading) {
            return (
                <div className="container-loading text-center align-middle">
                    <i className="fa fa-spinner fa-spin" aria-hidden="true"/>
                </div>
            )
        }

        return (
            <div className="container">
                <div className="row">
                    <AccessControlView/>
                    <div className="col-md-6 col-sm-6">
                        <h3>Here will be something ...</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings