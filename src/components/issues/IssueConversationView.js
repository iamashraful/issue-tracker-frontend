import React, {Component} from "react";
import BasicStore from "../../stores/basic-store";


class IssueConversationView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            statusCode: 0,
            permissionError: false,
            conversation: {},
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
        if(Object.keys(this.state.conversation).length === 0 && this.state.conversation.constructor === Object) {
            return null;
        }

        console.log(this.state.conversation);
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Notes</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.state.conversation.comments.map(comment => {
                            return (
                                <div className="card m-b-15" key={comment.id}>
                                    <div className="card-header p-0 pl-2">
                                        <h4>Comment & Replies</h4>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="pl-2 mb-0">
                                            <i className="fa fa-comments" aria-hidden="true"/>
                                            <span className="pl-1">{comment.text}</span>
                                        </h5>
                                        <p className="pl-2 pt-0 text-muted">Commented by, {comment.author.name}</p>
                                        <div className="ml-5">
                                            <strong>Replies</strong>
                                            {
                                                comment.replies.map(reply => {
                                                    return (
                                                        <p key={reply.id}>
                                                            <i className="fa fa-reply" aria-hidden="true"/>
                                                            <span className="pl-1">{reply.text} --</span>
                                                            <span className="text-muted">{reply.author.name}</span>
                                                        </p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
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