import React, { Fragment } from 'react';
import { DatePicker, Col } from 'antd';
import './index.less';

class DateRangePicker extends React.PureComponent {

    handleOnDatePickerChange = (date, dateString, data_key) => {
        console.log(data_key, dateString);
    }

    render() {
        const data = this.props.data;
        return (
            <Fragment>
                <DatePicker placeholder="请选择" className="datapicker" onChange={(date, dateString) => this.handleOnDatePickerChange(date, dateString, "startDate")} />
                 <label className="label">-</label>&nbsp;
                <DatePicker placeholder="请选择" className="datapicker" onChange={(date, dateString) => this.handleOnDatePickerChange(date, dateString, "endDate")} />
            </Fragment>
        );
    };
}

export default DateRangePicker;