import React, {Component} from "react";


class ProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectSlug: ""
        };
    }

    componentWillMount() {
        // Set projectSlug to state
        this.setState({projectSlug: this.props.match.params.slug});
    }

    render() {
        return(
            <h1>{this.state.projectSlug}</h1>
        )
    }
}

export default ProjectDetails