import React, {Component} from "react";
import {Line, Pie} from 'react-chartjs-2';


class ProgressReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            progressData: [0, 59, 80, 81, 56, 55, 40],
        };

        this.lineChartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'Project 1',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [0, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Project 2',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(255,192,192,0.4)',
                    borderColor: 'rgba(255,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(255,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(255,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [40, 25, 55, 74, 30, 75, 40]
                }
            ]
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

    render() {
        return (
            <div className="container-fluid">
                <h2 className="text-center">Project's Progress Report</h2>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <Line data={this.lineChartData} />
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <Pie data={this.pieChartData} />
                    </div>
                </div>

            </div>
        )
    }
}

export default ProgressReport;