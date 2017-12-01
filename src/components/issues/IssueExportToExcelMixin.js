import React, {Component} from "react";
import ExportToExcel from "../utility/ExportToExcel";
import BasicStore from '../../stores/basic-store';


class IssueExportToExcelMixin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fields: []
        };
    }

    render() {
        let log = [];
        const fields = [
            'Title', 'Project Name', 'Author', 'Due Date', 'Assigned to', 'Progress',
            'Status', 'Priority', 'Tracker', 'Created at', 'Updated at'
        ];

        if(this.props.issues.length !== 0 || this.props.issues !== undefined) {
            // this.generateExportData(this.props.log);
            // console.log(this.props.log.length);
            this.props.issues.map((issue) => {
                return log.push({
                    'Title': issue.title,
                    'Project Name': issue.project.name,
                    'Author': issue.author,
                    'Due Date': issue.due_date,
                    'Assigned to': issue.assigned_to.name,
                    'Progress': issue.progress + ' %',
                    'Status': BasicStore.issueStatusEnum[issue.status],
                    'Priority': BasicStore.issueStatusEnum[issue.priority],
                    'Tracker': BasicStore.issueStatusEnum[issue.tracker],
                    'Created at': issue.created_at,
                    'Updated at': issue.updated_at
                })
            });
        }
        const exportButton = <button
            className="btn btn-primary" style={{marginLeft: '15px', marginTop: '-100px'}}>
            Export to Excel</button>;
        const buttonElem = this.props.buttonElem === undefined ? exportButton : this.props.buttonElem;

        return (
            <div>
                <ExportToExcel
                    buttonElement={buttonElem}
                    data={log} fields={fields}
                    fileName={"Issue List.xlsx"}
                />
            </div>
        )
    }
}

export default IssueExportToExcelMixin;