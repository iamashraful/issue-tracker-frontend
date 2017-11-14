import React, {Component} from "react";
import {Line, Pie} from 'react-chartjs-2';
import BasicStore from "../../stores/basic-store";


class ProgressReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            lineChart: [0, 59, 80, 81, 56, 55, 40, 0, 59, 80, 81, 56, 55],
            reportData: "",
        };
        this.staticColors = ['#EC6518', '#8ED29E', '#93357B', '#31EF0B', '#0BEF9C', '#0BC9EF', '#990BEF', '#404D05'];
        this.lineChartData = {
            labels: [],
            datasets: []
        };

        this.pieChartData = {
            labels: [
                'Red',
                'Green',
                'Yellow'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        };
    }

    generateLineChartData() {
        this.lineChartData['labels'] = this.state.reportData['line_chart']['labels'];
        const dataLength = this.state.reportData['line_chart']['data'].length;
        for (let i = 0; i < dataLength; i++) {
            const getColor = this.staticColors[Math.floor(Math.random()*this.staticColors.length)];
            let eachData = {
                label: this.state.reportData['line_chart']['data'][i].label,
                fill: false,
                lineTension: 0.1,
                backgroundColor: getColor,
                borderColor: getColor,
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: getColor,
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: getColor,
                pointHoverBorderColor: getColor,
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: this.state.reportData['line_chart']['data'][i].data
            };
            this.lineChartData['datasets'].push(eachData);
        }
    }

    getProgressReportData() {
        const url = BasicStore.makeUrl('api/v1/pms/progress-report/');
        const payload = {
            method: 'GET',
            headers: BasicStore.headers
        };
        fetch(url, payload).then((response) => {
            return response.json();
        }).then((data) => {
            // set loading false for stop loading feature
            this.setState({loading: false, reportData: data});
        }).catch((err) => {
            console.log(err);
        });
    }

    componentWillMount() {
        this.getProgressReportData();
    }

    render() {
        if(this.state.reportData !== "") {
            this.generateLineChartData();
        }
        return (
            <div className="container-fluid">
                <h2 className="text-center">Project's Progress Report</h2>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <Line data={this.lineChartData}/>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <Pie data={this.pieChartData}/>
                    </div>
                </div>

            </div>
        )
    }
}

export default ProgressReport;