import React, {Component} from "react";
import ExportToExcel from "../utility/ExportToExcel";


class ActivityLogExportMixin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fields: []
        };
    }

    render() {
        let log = [];
        const fields = ['Author', 'Action Type', 'Action Message', 'Action Date'];

        if(this.props.log.length !== 0 || this.props.log !== undefined) {
            // this.generateExportData(this.props.log);
            // console.log(this.props.log.length);
            this.props.log.map((d) => {
                log.push({
                    'Action Type': d.action,
                    'Action Date': d.created_at,
                    'Action Message': d.operational_text,
                    'Author': d.profile.name
                })
            });
        }
        const exportButton = <button className="btn btn-primary">Export to Excel</button>;
        const buttonElem = this.props.buttonElem === undefined ? exportButton : this.props.buttonElem;

        return (
            <div>
                <ExportToExcel
                    buttonElement={buttonElem}
                    data={log} fields={fields}
                    fileName={"Activity Report.xlsx"}
                />
            </div>
        )
    }
}

export default ActivityLogExportMixin;