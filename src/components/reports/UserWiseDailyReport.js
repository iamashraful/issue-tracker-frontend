import React from "react";
import DailyReport from "./DailyReport";


class UserWiseDailyReport extends DailyReport {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <h1>User Wise</h1>
            </div>
        )
    }
}

export default UserWiseDailyReport;
