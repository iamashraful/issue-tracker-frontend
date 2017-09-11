import React, {Component} from 'react';
import NoAccess from "./NoAccess";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayClass: 'd-block'
        };
        this.contentVisibility.bind(this);
    }

    contentVisibility(val) {
        this.setState({displayClass: val})
    }

    render() {
        let mainContentClass = '';
        mainContentClass += this.state.displayClass;

        return (
            <div>
                <NoAccess displayCSS={this.contentVisibility.bind(this)}/>
                <div className={mainContentClass}>
                    <h1 className="text-center">Welcome Dashboard</h1>
                </div>
            </div>

        )
    }
}

export default Dashboard;