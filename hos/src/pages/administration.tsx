import React from 'react';
import TimeRangePicker from '@/components/timeRangePicker'

class Administration extends React.Component {

  onBlur = (time) =>{
    console.dir(time)
  }

    render() {
        return (
          <TimeRangePicker onBlur={this.onBlur}/>
        );
    }
}

export default Administration;
