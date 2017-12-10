import React, {Component} from "react";
import ExportToExcel from "../utility/ExportToExcel";
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class ActivityLogExportMixin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fields: ['Author', 'Action Type', 'Action Message', 'Action Date']
        };
        this.onFieldSelect = this.onFieldSelect.bind(this);
    }

    onFieldSelect(val) {
        // Declare an empty fields
        let data = [];
        val.map(item => {
            return data.push(item.value);
        });
        this.setState({fields: data});
    }

    render() {
        let log = [];
        const fields = ['Author', 'Action Type', 'Action Message', 'Action Date'];
        let fieldsSelectFormatData = [];
        for (let x=0; x<fields.length; x++) {
            fieldsSelectFormatData.push({label: fields[x], value: fields[x]})
        }

        if(this.props.log.length !== 0 || this.props.log !== undefined) {
            // this.generateExportData(this.props.log);
            // console.log(this.props.log.length);
            this.props.log.map((d) => {
                return log.push({
                    'Action Type': d.action,
                    'Action Date': d.created_at,
                    'Action Message': d.operational_text,
                    'Author': d.profile.name
                })
            });
        }
        const exportButton = <button className="btn btn-primary" style={{marginTop: '10px'}}>Export to Excel</button>;
        const buttonElem = this.props.buttonElem === undefined ? exportButton : this.props.buttonElem;

        return (
            <div>
                <button
                    style={{marginTop: '-10px', marginBottom: '10px'}}
                    data-toggle="modal" data-target="#exportModal"
                    className="btn btn-primary">
                    Advance Export
                </button>

                {/* Here will be a modal to advance export facilities */}
                <div className="modal fade" id="exportModal"
                     role="dialog" aria-labelledby="exportModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">
                                    <span aria-hidden="true">&times;</span>
                                    <span className="sr-only">Close</span>
                                </button>
                                <h4 className="modal-title text-truncate p-l-r-1" id="exportModalLabel">
                                    Advance Export View
                                </h4>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <label>Fields will be exported</label>
                                    <Select
                                        required multi={true}
                                        name="form-field-name"
                                        value={this.state.fields}
                                        options={fieldsSelectFormatData}
                                        onChange={this.onFieldSelect.bind(this)}
                                    />
                                    <ExportToExcel
                                        buttonElement={buttonElem}
                                        data={log} fields={this.state.fields}
                                        fileName={"Activity Report.xlsx"}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ActivityLogExportMixin;