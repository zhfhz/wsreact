import React from "react";
import moment from "moment";

export default
class Base extends React.Component {
    state = {
        startDate: moment().add(-1, 'months'),
        endDate: moment(),
        useAnimate: true,
    };
    dateFormat = 'yyyy-MM-DD';
    componentDidMount() {
        this.setState({
            useAnimate: false
        }, () => this.query());
    }

    query = () => {
        const { getViewData } = this.props;
        const { startDate, endDate } = this.state;
        getViewData({
            tenantId: 'T00000',
            startTime: `${startDate.format(this.dateFormat)} 00:00:00`,
            end: `${endDate.format(this.dateFormat)} 23:59:59`,
        });
    }

    handleDisableDate = time => {
        const now = moment();
        if (time > now) {
            return true;
        }
        return false;
    }

    handleStartDatePickerChange = startDate => {
        const { endDate } = this.state;
        let state = this.handleDatePickerChange(startDate, endDate);
        const targetEndDate = moment(state.startDate).add(1, 'months');
        state = {
            ...state,
            endDate: targetEndDate
        }
        this.setState(state);
    }

    handleEndDatePickerChange = endDate => {
        const { startDate } = this.state;
        let state = this.handleDatePickerChange(startDate, endDate);
        const targetStartDate = moment(state.endDate).add(-1, 'months');
        state = {
            ...state,
            startDate: targetStartDate
        };
        this.setState(state);
    }

    handleDatePickerChange = (startDate, endDate) => {
        const now = moment();
        let state = {
            startDate,
            endDate
        };
        if (startDate > endDate) {
            state = {
                ...state,
                endDate: state.startDate,
                startDate: state.endDate
            }
        }
        if (state.endDate >= now) {
            state = {
                ...state,
                endDate: now,
                startDate: moment(now).add(-1, 'months')
            }
        } else {

        }
        return state;
    }
}