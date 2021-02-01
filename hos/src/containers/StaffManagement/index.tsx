/**
 * @page 费用补录
 * @description 搜索框和搜索结果组件
 * @props title 搜索框左侧标题
 * @props children 被该组件包裹的内容
 */

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message, DatePicker, Spin, Checkbox } from 'antd';
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
@connect(({ loading,  staffManagement}) => ({ loading, staffManagement}))
class StaffManagementResearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCondition:{
                input:'',
                state:'3',
                visible:false
            }
        };
    }
    columns=[
        {
            title:'序号',
            width:50,
            render:(text,record,index)=>index+1
        },{
            title:'工号',
            width:120,
            key:'id',
            dataIndex:'id',
            ellipsis: true
        },{
            title:'姓名',
            width:80,
            key:'userName',
            dataIndex:'userName',
            ellipsis: true
        },{
            title:'手机号',
            width:120,
            key:'tel',
            dataIndex:'tel',
            ellipsis: true
        },{
            title:'类型',
            width:120,
            key:'job',
            dataIndex:'job',
            ellipsis: true
        },{
            title:'诊所名称',
            width:120,
            key:'hospName',
            dataIndex:'hospName',
            ellipsis: true
        },{
            title:'创建人',
            width:120,
            key:'createName',
            dataIndex:'createName',
            ellipsis: true
        },{
            title:'修改人',
            width:120,
            key:'updateName',
            dataIndex:'updateName',
            ellipsis: true
        },{
            title:'权限',
            width:120,
            ellipsis: true
        },{
            title:'修改',
            width:120,
            ellipsis: true
        },{
            title:'修改密码',
            width:120,
            ellipsis: true
        },{
            title:'签名设置',
            width:120,
            ellipsis: true
        },
    ]
    closeModal=()=>{
        this.setState({visible:false})
    }
    search=()=>{
        const {dispatch}=this.props
        let obj=this.state.searchCondition
        dispatch({
            type:'staffManagement/staffDict_getStaffDict',
            payload:{
                status:obj.state==3?'':obj.state,
                input:obj.input,
                hospCode:sessionStorage.getItem('hospCode')
            }
        })
    }
    createStaff=()=>{
        this.setState({visible:true})
    }


    render() {
        const { children } = this.props;
        const title = this.props.title;
        const {staffManagement}=this.props
        // const myDisabled=sessionStorage.getItem('platformToken')=='appointmentSystem'
        const myDisabled=false
        return (
            <div className="staffManagement">
                {/* 搜索头部 */}
                <div className="research-head">
                    {/* 头部左侧标题 */}
                    <div className="left-title">
                        <span>{title}</span>
                    </div>
                    {/* 右侧搜索项 */}
                    <div className="right-research">
                        <Button type='primary' onClick={this.createStaff}>新增员工</Button>
                    </div>
                </div>
                {/* 搜索框包裹内容 */}
                <div className="research-body-content">
                    {/* 主体 */}
                    <div className="research-body-content-body">
                        <div className={'searchCondition'}>
                        <CreateDra visible={this.state.visible} closeModal={this.closeModal} search={this.search}/>
                            <div>
                                <Search
                                    placeholder="input search text"
                                    value={this.state.searchCondition.input}
                                    onChange={e => {
                                        let obj=this.state.searchCondition
                                        obj.input=e.target.value
                                        this.setState({searchCondition:obj})
                                    }}
                                    onSearch={this.search}
                                    style={{ width: 200 }}
                                /> 
                            </div>
                            <div>
                                <Select style={{ width: 200 }} 
                                   value={this.state.searchCondition.state}
                                   onChange={value => {
                                    let obj=this.state.searchCondition
                                    obj.state=value
                                    this.setState({searchCondition:obj},this.search)
                                   }}
                                >
                                    <Option key='3'>全部状态</Option>
                                    <Option key='0'>启用</Option>
                                    <Option key='1'>停用</Option>
                                </Select>
                            </div>
                            <div>
                                <Button type='primary' onClick={this.search}> 查询</Button>
                            </div>
                        </div>
                    
                        <Table 
                          columns={this.columns}
                          dataSource={staffManagement.staffList}
                        >

                        </Table>
                    </div>
                    {/* 底部按钮 */}
                </div>
            </div>
        );
    }
}

export default StaffManagementResearch;
