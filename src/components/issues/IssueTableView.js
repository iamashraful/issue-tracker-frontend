import React, {Component} from "react";
import {Link} from "react-router-dom";
import BasicStore from "../../stores/basic-store";


class IssueTableView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: []
        }
    }

    render() {
        // console.log(this)
        if (this.props.loading) {
            return (
                <div className="container-loading text-center align-middle">
                    <i className="fa fa-spinner fa-spin" aria-hidden="true"/>
                </div>
            )
        }

        if (this.props.issues.length === 0) {
            return (
                <div className="text-center">
                    <p>No data found.</p>
                </div>
            )
        }

        const tableRowView = this.props.issues.map(function (issue) {
            let tableRowClass = '';
            if (issue.tracker === BasicStore.issueTrackerEnum.bug) {
                tableRowClass = 'table-danger';
            }
            if (issue.tracker === BasicStore.issueTrackerEnum.support) {
                tableRowClass = 'table-info';
            }

            return(
                <tr className={tableRowClass} key={issue.id}>
                    <th scope="row">{issue.id}</th>
                    <td className="text-truncate force-text-ellipsis" title={issue.title}>
                        <Link to={BasicStore.urlPaths.issues + "/" + issue.id}>
                            {issue.title}
                        </Link>
                    </td>
                    <td className="text-truncate" title={issue.project.name}>
                        <Link to={BasicStore.urlPaths.projects + "/" + issue.project.slug}>
                            {issue.project.name}
                        </Link>
                    </td>
                    <td>
                        <Link to={BasicStore.urlPaths.profiles + '/' + issue.author_id}>{issue.author}</Link>
                    </td>
                    <td>{BasicStore.issueTrackerEnum[issue.tracker]}</td>
                    <td>{issue.created_at}</td>
                    <td>{issue.due_date}</td>
                    <td>
                        <Link to={BasicStore.urlPaths.profiles + '/' + issue.assigned_to.id}>{issue.assigned_to.user.username}</Link>
                    </td>
                    <td>{BasicStore.issuePriorityEnum[issue.priority]}</td>
                    <td>{BasicStore.issueStatusEnum[issue.status]}</td>
                    <td>{issue.progress}%</td>
                    <td>{issue.updated_at}</td>
                </tr>
            )
        });


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
                        {tableRowView}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default IssueTableView;