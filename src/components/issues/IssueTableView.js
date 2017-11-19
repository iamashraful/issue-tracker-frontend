import React, {Component} from "react";
import {Link} from "react-router-dom";
import BasicStore from "../../stores/basic-store";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


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
                    <p>No issues found.</p>
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
                <ReactTable
                    noDataText="No Issues Found!!"
                    data={this.props.issues}
                    columns={[
                        {
                            columns: [
                                {
                                    Header: "#",
                                    accessor: "id",
                                    width: 40
                                },
                                {
                                    Header: "Title",
                                    accessor: "title",
                                    width: 280
                                },
                                {
                                    Header: "Project Name",
                                    id: "project.name",
                                    accessor: issue => issue.project.name
                                },
                                {
                                    Header: "Tracker",
                                    accessor: "author"
                                },
                                {
                                    Header: "Due Date",
                                    accessor: "author"
                                },
                                {
                                    Header: "Assigned to",
                                    id: "assigned_to.user.username",
                                    accessor: issue => issue.assigned_to.user.username
                                },
                                {
                                    Header: "Progress (%)",
                                    accessor: "progress"
                                },
                                {
                                    Header: "Status",
                                    accessor: "status"
                                },
                                {
                                    Header: "Priority",
                                    accessor: "priority"
                                },
                                {
                                    Header: "Created at",
                                    accessor: "created_at"
                                },
                                {
                                    Header: "Updated at",
                                    accessor: "updated_at"
                                },

                            ]
                        },
                    ]}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />



                {/*<table className="table table-hover">*/}
                    {/*<thead>*/}
                    {/*<tr>*/}
                        {/*<th>#</th>*/}
                        {/*<th className="w-10">Title</th>*/}
                        {/*<th>Project</th>*/}
                        {/*<th>Author</th>*/}
                        {/*<th>Tracker</th>*/}
                        {/*<th>Created</th>*/}
                        {/*<th>Due Date</th>*/}
                        {/*<th>Assignee</th>*/}
                        {/*<th>Priority</th>*/}
                        {/*<th>Status</th>*/}
                        {/*<th>% Done</th>*/}
                        {/*<th>Updated</th>*/}
                    {/*</tr>*/}
                    {/*</thead>*/}
                    {/*<tbody>*/}
                        {/*{tableRowView}*/}
                    {/*</tbody>*/}
                {/*</table>*/}
            </div>
        )
    }
}

export default IssueTableView;