import React from 'react';
import {Select,message} from 'antd';

import './index.less'

let optionsM = [],optionsS = [];

for(let i=0; i<=23; i++){
  optionsM.push(<Option key={i+''} style={{padding:'2px'}}>{i}</Option>)
}
for(let i=0; i<=59; i++){
  let s;
  i < 10 ? s = '0'+i : s = i;
  optionsS.push(<Option key={s+''} style={{padding:'2px'}}>{s}</Option>)
}


class TimeRangePicker extends React.Component {

  state ={
    start_m:'0',
    start_s:'00',
    end_m:'0',
    end_s:'00',
  }
  componentWillMount(){
    let text=this.props.fatherTime;
    console.log(this.props.fatherTime)
    if(text!=''&&text!=undefined){
      let arr=text.split('-');
      let arr1=arr[0].split(":")
      let arr2=arr[1].split(":")
      console.log(arr,arr1,arr2)
      this.setState({start_m:arr1[0],
                    start_s:arr1[1],
                    end_m:arr2[0],
                    end_s:arr2[1]},
                    ()=>{console.log(this.state);this.getTime()})
    }else{
      this.getTime()
    }
    
  }

  onChange = (value,key) =>{
    if(key=='start_m'&&parseInt(this.state.end_m)<parseInt(value)){
      this.setState({'end_m':value})
      if(parseInt(this.state.end_s)<parseInt(this.state.start_s)){
        this.setState({end_s:this.state.start_s})
      }
    }else if(key=='start_s'){
      if(parseInt(this.state.start_m)==parseInt(this.state.end_m)&&parseInt(this.state.end_s)<parseInt(value)){
        this.setState({end_s:value})
      }
    }
    this.setState({
      [key]:value
    })
  }

  getTime = () => {
    const {start_m,start_s,end_m,end_s} = this.state
    let startTime = start_m + ":"+start_s
    let endTime = end_m + ":"+end_s
    this.props.onBlur({
      startTime,endTime,
      start_m:this.state.start_m,
      start_s:this.state.start_s,
      end_m:this.state.end_m,
      end_s:this.state.end_s,
    })
  }

  render() {
    return (
      <div className="timePicker" onBlur={this.getTime} id='selectTime'>
        <Select
        disabled={this.props.disabled}
          showArrow={false}
          placeholder='时'
          value={this.state.start_m}
          onChange={(value)=>this.onChange(value,'start_m')}
          dropdownMatchSelectWidth={false}
          getPopupContainer={()=>document.getElementById('selectTime')}
        >
          {optionsM}
        </Select>
        <span>:</span>
        <Select
          showArrow={false}
          disabled={this.props.disabled}
          value={this.state.start_s}
          getPopupContainer={()=>document.getElementById('selectTime')}
          placeholder='分'
          defaultValue={this.state.start_s}
          onChange={(value)=>this.onChange(value,'start_s')}
          dropdownMatchSelectWidth={false}
        >
          {optionsS}
        </Select>
        <span>~</span>
        <Select
          showArrow={false}
          disabled={this.props.disabled}
          value={this.state.end_m}
          placeholder='时'
          getPopupContainer={()=>document.getElementById('selectTime')}
          defaultValue={this.state.end_m}
          onChange={(value)=>this.onChange(value,'end_m')}
          dropdownMatchSelectWidth={false}
        >
          {optionsM.filter((val)=>{return parseInt(val.key)>=parseInt(this.state.start_m)})}
        </Select>
        <span>:</span>
        <Select
          showArrow={false}
          disabled={this.props.disabled}
          value={this.state.end_s}
          placeholder='分'
          getPopupContainer={()=>document.getElementById('selectTime')}
          defaultValue={this.state.end_s}
          onChange={(value)=>this.onChange(value,'end_s')}
          dropdownMatchSelectWidth={false}
        >
          {optionsS.filter((val)=>{
            if(this.state.start_m==this.state.end_m){
              return parseInt(val.key)>parseInt(this.state.start_s)
            }else{return true}
          })}
        </Select>
      </div>
    );
  }
}

export default TimeRangePicker;
