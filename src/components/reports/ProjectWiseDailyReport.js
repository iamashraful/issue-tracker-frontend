import React from "react";
import DailyReport from "./DailyReport";


class ProjectWiseDailyReport extends DailyReport {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <h1>Project wise report</h1>
            </div>
        )
    }
}

export default ProjectWiseDailyReport;
