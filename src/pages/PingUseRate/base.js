import React from "react";
import moment from "moment";

export default
class Base extends React.PureComponent {
    state = {
        startDate: moment().add(-1, 'months'),
        endDate: moment(),
        useAnimate: true,
    };
    dateFormat = 'yyyy-MM-DD';
    constructor(props) {
        super(props);
        const { openSocket } = props;
        openSocket();
    }
    componentDidMount() {
        this.query();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.socketInstance !== this.props.socketInstance) {
            this.props.socketInstance.send('xxx');
        }
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
        }
        return state;
    }
}