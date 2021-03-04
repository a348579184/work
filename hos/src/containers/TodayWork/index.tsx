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
import CreateRegister from '@/containers/TodayWork/CreateRegister';
import DetailDra from '@/containers/TodayWork/DetailDra';
import MedicalRecord from '@/containers/TodayWork/MedicalRecord';
import AddFee from '@/containers/TodayWork/AddFee';
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
class TodayResearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCondition:{
                input:'',
                state:'3',
                pvisible:false,
                rvisible:false,
                dvisible:false
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
            key:'patientId',
            dataIndex:'patientId',
            ellipsis: true
        },{
            title:'性别',
            width:50,
            key:'sex',
            dataIndex:'sex',
            ellipsis: true,
            render:text=>text==2?'女':'男'
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
            key:'registrationDoctor',
            dataIndex:'registrationDoctor',
            ellipsis: true
        },{
            title:'类型',
            width:60,
            key:'clinicType',
            dataIndex:'clinicType',
            ellipsis: true,
            render:text=>text==1?'初诊':'复诊'
        },{
            title:'就诊事项',
            width:100,
            key:'updateName',
            dataIndex:'updateName',
            ellipsis: true,
            render:text=>{
                if(text!=''&&text!=null){
                    text=JSON.parse(text)
                    text=text.join(';')
                }
            }
        },{
            title:'时间',
            width:170,
            key:'registrationDate',
            dataIndex:'registrationDate',
            ellipsis: true
        },{
            title:'状态',
            width:80,
            key:'clinicState',
            dataIndex:'clinicState',
            ellipsis: true,
            render:text=>{
                let str=''
                if(text==1){return '已挂号'}
                else if(text==2){
                    return <div style={{color:'red'}}>治疗中</div>
                }
                else if(text==3){
                    return <div style={{color:'#11abda'}}>已完成</div>
                }

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
        this.setState({pvisible:false,rvisible:false,dvisible:false})
    }
    search=()=>{
        const {dispatch}=this.props
        dispatch({
            type:'today/registrationMaster_getRegistrationMaster',
            payload:{hospCode:sessionStorage.getItem('hospCode')}
            
        })
        dispatch({type:'today/registrationMaster_getHeadline',})
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
    dopen=(e,record)=>{
        const {dispatch}=this.props
        dispatch({
            type:'today/registrationMaster_getRegistrationById',
            payload:{
                "hospCode": sessionStorage.getItem('hospCode'),
                "patientId": record.patientId,
                "visitId": record.visitId
              },
            callback:res=>{
                if(res.success){
                    this.setState({dvisible:true})
                }
            }
        })
        
    }
    ropen=()=>{
        const {dispatch}=this.props
        dispatch({
            type:'today/patientMaster_getPatientMasterByDto',
            payload:{
                "input": "",
                "selectStatus": 0,
                hospCode:sessionStorage.getItem('hospCode')
            },
            callback:res=>{
                
            }
        })
        dispatch({
            type:'itemSetting/tagDict_getRegistrationTag',
            payload:{tagList:[]}
        })
        this.setState({rvisible:true})
        
    }
    openMedical=()=>{
        this.setState({dvisible:false})
        const {dispatch}=this.props
        dispatch({type:'today/mvisibleChange',payload:true})
    }
    openFee=()=>{
        this.setState({dvisible:false})
        const {dispatch}=this.props
        dispatch({type:'today/fvisibleChange',payload:true})
    }
    mDraClose=()=>{
        this.setState({dvisible:true})
        const {dispatch}=this.props
        dispatch({type:'today/mvisibleChange',payload:false})
    }
    fDraClose=()=>{
        this.setState({dvisible:true})
        const {dispatch}=this.props
        dispatch({type:'today/fvisibleChange',payload:false})
    }


    render() {
        const { children } = this.props;
        const title = this.props.title;
        const {today}=this.props
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
                        <Button type='primary' onClick={this.ropen} style={{marginRight:10}}>新增挂号</Button>
                        <Button type='primary' onClick={this.popen}>新增患者</Button>
                    </div>
                </div>
                {/* 搜索框包裹内容 */}
                <div className="research-body-content">
                    {/* 主体 */}
                    <div className="research-body-content-body">
                        <div className={'searchCondition'}>
                        <CreatePatient visible={this.state.pvisible} closeModal={this.closeModal} search={this.search}/>
                        <CreateRegister visible={this.state.rvisible} closeModal={this.closeModal} search={this.search}/>
                        <DetailDra visible={this.state.dvisible} closeModal={this.closeModal} search={this.search} openMedical={this.openMedical} openFee={this.openFee}/>
                        {this.props.today.mvisible?<MedicalRecord closeModal={this.mDraClose}/>:''}
                        {this.props.today.fvisible?<AddFee closeModal={this.fDraClose}/>:''}    
                           <div>
                               <div>
                                   今日新增患者
                               </div>
                               <div>
                                   {today.titleObj.patient}人
                               </div>
                           </div>
                           <div>
                               <div>
                                   今日挂号
                               </div>
                               <div>
                                   {today.titleObj.registration}人
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
                          dataSource={today.registerList}
                          onRow={record => {
                            return {
                              onClick: event => {
                                  this.dopen(event,record)
                              }, // 点击行
                            //   onDoubleClick: event => {},
                            //   onContextMenu: event => {},
                            //   onMouseEnter: event => {}, // 鼠标移入行
                            //   onMouseLeave: event => {},
                            };
                          }}
                        >

                        </Table>
                    </div>
                    {/* 底部按钮 */}
                </div>
            </div>
        );
    }
}

export default TodayResearch;
