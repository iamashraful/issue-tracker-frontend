import React, {Component} from "react";
import BasicStore from "../../stores/basic-store";


class IssueConversationView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            statusCode: 0,
            permissionError: false,
            conversation: "",
        }
    }

    getConversation() {
        const url = BasicStore.makeUrl('api/v1/pms/issues/' + this.props.issueId + '/conversations/');
        const payload = {
            method: 'GET',
            headers: BasicStore.headers
        };
        fetch(url, payload).then((response) => {
            if (response.status === 401) {
                this.setState({unAuth: true});
            }
            if (response.status === 403) {
                this.setState({permissionError: true});
            }
            return response.json();
        }).then((data) => {
            // set loading false for stop loading feature
            this.setState({loading: false, conversation: data});
            console.log(this.state.conversation);
        }).catch((err) => {
            console.log(err);
        });
    }

    componentDidMount() {
        this.getConversation();
    }

    render() {
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Conversations</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default IssueConversationView;