/**
 * @page 费用补录
 * @description 搜索框和搜索结果组件
 * @props title 搜索框左侧标题
 * @props children 被该组件包裹的内容
 */

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message, DatePicker, Spin, Checkbox,Popconfirm } from 'antd';
import CreatePatient from '@/containers/TodayWork/CreatePatient';
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
                pvisible:false,
                rvisible:false,
            }
        };
    }
    columns=[
        {
            title:'序号',
            width:50,
            render:(text,record,index)=>index+1
        },{
            title:'姓名',
            width:100,
            key:'name',
            dataIndex:'name',
            ellipsis: true
        },{
            title:'病历号',
            width:140,
            key:'userName',
            dataIndex:'userName',
            ellipsis: true
        },{
            title:'性别',
            width:50,
            key:'sex',
            dataIndex:'sex',
            ellipsis: true
        },{
            title:'年龄',
            width:60,
            key:'age',
            dataIndex:'age',
            ellipsis: true,
            
        },{
            title:'手机号',
            width:120,
            key:'tel',
            dataIndex:'tel',
            ellipsis: true
        },{
            title:'医生',
            width:80,
            key:'createName',
            dataIndex:'createName',
            ellipsis: true
        },{
            title:'类型',
            width:60,
            key:'updateName',
            dataIndex:'updateName',
            ellipsis: true
        },{
            title:'就诊事项',
            width:100,
            key:'updateName',
            dataIndex:'updateName',
            ellipsis: true
        },{
            title:'时间',
            width:170,
            key:'updateName',
            dataIndex:'updateName',
            ellipsis: true
        },{
            title:'状态',
            width:80,
            key:'updateName',
            dataIndex:'updateName',
            ellipsis: true,
            render:text=>{

            }
        },
        
    ]
    componentDidMount(){
        const {dispatch}=this.props
        dispatch({
            type:'staffManagement/staffDict_getStaffDict',
            payload:{
                status:'',
                input:'',
                hospCode:sessionStorage.getItem('hospCode')
            }
        })
        dispatch({
            type:'itemSetting/tagDict_getRegistrationTag',
            payload:{tagList:[]},
            callback:res=>{
                if(res.success){
                    let obj={}
                    let arr=[]
                    for(let i=0;i<res.result.length;i++){
                        let val=res.result[i]
                        if(obj[val.tagCode]==1){
                            continue
                        }else{
                            arr.push(val)
                            obj[val.tagCode]=1
                        }
                    }
                    dispatch({
                        type:'today/tagListSave',
                        payload:arr
                    })
                }
            }
        })
        this.search()

    }
    
    closeModal=()=>{
        this.setState({pvisible:false,rvisible:false})
    }
    search=()=>{
        const {dispatch}=this.props
        let obj=this.state.searchCondition
        // dispatch({
        //     type:'staffManagement/staffDict_getStaffDict',
        //     payload:{
        //         status:obj.state==3?'':obj.state,
        //         input:obj.input,
        //         hospCode:sessionStorage.getItem('hospCode')
        //     }
        // })
    }
    popen=()=>{
        const {dispatch}=this.props
        dispatch({
            type:'today/patientMaster_getpatientId',
            callback:res=>{
                if(res.success){
                    this.setState({pvisible:true})
                }
            }
        })
        
    }


    render() {
        const { children } = this.props;
        const title = this.props.title;
        const {staffManagement}=this.props
        // const myDisabled=sessionStorage.getItem('platformToken')=='appointmentSystem'
        const myDisabled=false
        return (
            <div className="todaywork">
                {/* 搜索头部 */}
                <div className="research-head">
                    {/* 头部左侧标题 */}
                    <div className="left-title">
                        <span>{title}</span>
                    </div>
                    {/* 右侧搜索项 */}
                    <div className="right-research">
                        <Button type='primary' onClick={this.createStaff} style={{marginRight:10}}>新增挂号</Button>
                        <Button type='primary' onClick={this.popen}>新增员工</Button>
                    </div>
                </div>
                {/* 搜索框包裹内容 */}
                <div className="research-body-content">
                    {/* 主体 */}
                    <div className="research-body-content-body">
                        <div className={'searchCondition'}>
                        <CreatePatient visible={this.state.pvisible} closeModal={this.closeModal} search={this.search}/>
                           <div>
                               <div>
                                   今日新增患者
                               </div>
                               <div>
                                   20人
                               </div>
                           </div>
                           <div>
                               <div>
                                   今日挂号
                               </div>
                               <div>
                                   20人
                               </div>
                           </div>
                           <div>
                               <div>
                                   今日实收金额
                               </div>
                               <div>
                                   200元
                               </div>
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
