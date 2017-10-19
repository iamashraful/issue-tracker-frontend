import React, {Component} from "react";

class LogListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    render() {
        return (
            <div className="row">
                <p className="text-center">Here will be log view</p>
            </div>
        )
    }
}

export default LogListView;