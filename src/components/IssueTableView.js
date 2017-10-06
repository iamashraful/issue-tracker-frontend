import React, {Component} from "react";
import BasicStore from "../stores/basic-store";


class IssueTableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: []
        }
    }

    render() {
        return (
            <div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th className="w-10">Title</th>
                        <th>Project</th>
                        <th>Author</th>
                        <th>Tracker</th>
                        <th>Created</th>
                        <th>Due Date</th>
                        <th>Assignee</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>% Done</th>
                        <th>Updated</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.props.issues.map(issue =>
                        <tr className="table-danger" key={issue.id}>
                            <th scope="row">{issue.id}</th>
                            <td>{issue.title}</td>
                            <td>{issue.project.name}</td>  {/* TODO: Here will bw a Link */}
                            <td>Mr Robin</td>
                            <td>{BasicStore.issueTrackerEnum[issue.tracker]}</td>
                            <td>08/10/2017</td>
                            <td>12/10/2017</td>
                            <td>Ashraful Islam</td>
                            <td>{BasicStore.issuePriorityEnum[issue.priority]}</td>
                            <td>{BasicStore.issueStatusEnum[issue.status]}</td>
                            <td>{issue.progress}%</td>
                            <td>10/10/2017</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default IssueTableView;