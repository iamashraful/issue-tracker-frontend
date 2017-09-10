import React, {Component} from 'react';
import BasicStore from "../stores/basic-store";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuth: BasicStore.isAuthentication
        };
    }

    componentWillMount() {
        BasicStore.on("change", () => {
            this.setState({isAuth: BasicStore.isAuthentication})
        })
    }

    render() {
        let permissionErrorClass = this.state.isAuth ? 'd-none':'alert alert-danger text-center d-block';
        let mainContentClass = this.state.isAuth ? 'd-block' : 'd-none';

        return (
            <div>
                <div className="container">
                    <div className={permissionErrorClass}>
                        You don't have permission to view this content.
                    </div>
                </div>
                <div className={mainContentClass}>
                    <h1 className="text-center">Welcome Dashboard</h1>
                </div>
            </div>

        )
    }
}

export default Dashboard;