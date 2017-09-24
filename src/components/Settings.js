import React, {Component} from 'react';
import BasicStore from '../stores/basic-store';


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: BasicStore.userRole,
            allUrls: [],
            access_role: '',
            allRoles: [],
            loading: true
        };
    }

    getAllUrls() {
        const url = BasicStore.makeUrl('api/v1/role-manager/all-urls/');
        const payload = {
            method: 'GET',
            headers: BasicStore.headers
        };
        fetch(url, payload).then((response) => {
            return response.json();
        }).then((data) => {
            // set loading false for stop loading feature
            this.setState({loading: false});
            if (data.url_names) {
                this.setState({allUrls: data.url_names});
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    getAllRoles() {
        const url = BasicStore.makeUrl('api/v1/role-manager/roles/');
        const payload = {
            method: 'GET',
            headers: BasicStore.headers
        };
        fetch(url, payload).then((response) => {
            return response.json();
        }).then((data) => {
            // set loading false for stop loading feature
            this.setState({loading: false});
            if (data) {
                this.setState({allRoles: data});
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    componentWillMount() {
        BasicStore.on("change", () => {
            this.setState({role: BasicStore.userRole})
        });
        this.getAllUrls();
        this.getAllRoles();
    }

    handleAccessControl(event) {
        console.log("AccessControl");
        event.preventDefault();
    }

    render() {
        let accessControlView = 'card ';
        if (this.state.allUrls.length === 0) {
            accessControlView += 'd-none';
        }
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
                    <div className="col-md-6 col-sm-6">
                        <div className={accessControlView}>
                            <div className="card-header">
                                <h3>Set Role wise Permission</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.handleAccessControl}>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Username" type="text"
                                               onChange={(event) => this.setState({access_role: event.target.value})}
                                               value={this.state.access_role} required
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6">
                        <h1>World</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings