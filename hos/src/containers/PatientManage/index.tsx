/**
 * @page 费用补录
 * @description 搜索框和搜索结果组件
 * @props title 搜索框左侧标题
 * @props children 被该组件包裹的内容
 */

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message, DatePicker, Spin, Checkbox,Popconfirm } from 'antd';
import CreateDra from '@/containers/StaffManagement/CreateDra'
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash/debounce';
import withRouter from 'umi/withRouter';

import './index.less';
message.config({
    duration:3
})
const { Search } = Input;
const { Option } = Select;

@withRouter
@connect(({ loading,  staffManagement,today}) => ({ loading, staffManagement,today}))
class PatientManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plist:[]
        };
    }
    
    componentDidMount(){
        this.search()
    }
    search=()=>{
        this.props.dispatch({
            type:'today/patientMaster_getPatientMasterByDto',
            payload:{
                "input": '',
                "selectStatus": 0,
                hospCode:sessionStorage.getItem('hospCode')
            },
        })
    }
    
    


    render() {
        const { children } = this.props;
        const title = this.props.title;
        const {staffManagement}=this.props
        const {patientList}=this.props.today
        // const myDisabled=sessionStorage.getItem('platformToken')=='appointmentSystem'
        const myDisabled=false
        return (
            <div className="patientManege">
                {/* 搜索头部 */}
                <div className="research-head">
                    {/* 头部左侧标题 */}
                    <div className="left-title">
                        <span>{title}</span>
                    </div>
                    {/* 右侧搜索项 */}
                    <div className="right-research">
                        {/* <Button type='primary' onClick={this.createStaff}>新增员工</Button> */}
                    </div>
                </div>
                {/* 搜索框包裹内容 */}
                <div className="research-body-content">
                    {/* 主体 */}
                    <div className="research-body-content-body">
                        <div className={'searchCondition'}>
                            
                         <div>
                                <Search
                                    
                                    onSearch={this.search}
                                    style={{ width: 200 }}
                                /> 
                            </div>
                            
                            <div>
                                <Button type='primary' onClick={this.search}> 查询</Button>
                            </div>
                        </div>
                    
                        <div className={'cardContent'}>
                            {
                                patientList.map(val=>{
                                    return <div className={'card'}>
                                        <h2>{val.name}</h2>
                                        <div>
                                            {val.sex==1?'男':'女'}
                                            &nbsp;&nbsp;
                                            {val.age==null||val.age==''?'':val.age+'岁'}
                                            &nbsp;&nbsp;
                                            {'No.'+val.patientId}
                                        </div>
                                        <div>
                                            {val.tel}
                                        </div>
                                        <div>最近就诊：{val.lastDate}</div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    {/* 底部按钮 */}
                </div>
            </div>
        );
    }
}

export default PatientManage;
