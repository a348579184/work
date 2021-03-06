

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message,Radio, Checkbox, Modal,Form, DatePicker,Progress ,Row,Col,Drawer,Tree} from 'antd';
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
const { Search,TextArea } = Input;
const { Option } = Select;
const {TreeNode}=Tree

@Form.create()
@withRouter
@connect(({ loading,  staffManagement,today,itemSetting}) => ({ loading, staffManagement,today,itemSetting}))
class AddFeeDra extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            sex:'',
            age:'',patientId:'',clinicType:'',registrationDoctor:'',registrationDoctorCode:'',
            registrationDate:'',toothLocation:{topleft:[],topright:[],bottomleft:[],bottomright:[]},symptom:'',historyOfPresentIllness:'',previousHistory:'',
            inspectionReport:'',rayExamination:'',diagnose:'',treatment	:'',doctorAdvice:'',treatPlan:''
            
        };
        // this.selPatient=debounce(this.selPatient,500)
    }
    componentDidMount(){
        const {dispatch}=this.props
        const {rDetail}=this.props.today
        const {addrCity,
        addrCounty,
        addrProvince,
        addrDetailed,
        areaCode,
        clinicState,
        clinicTag,
        clinicTagId,
        registrationDoctor,
        registrationDoctorCode,
        age,
        clinicType,
        hospCode,
        id,
        identity,
        lastDate,
        name,
        operationDate,
        patientId,
        phone,
        registrationDate,
        remark,
        sex,
        tel,
        vipCode,
        visitId}=rDetail
        dispatch({
            type:'today/caseHistory_getCaseHistoryById',
            payload:{
                "hospCode": sessionStorage.getItem('hospCode'),
                "patientId": patientId,
                "visitId": visitId
              },
              callback:res=>{
                  if(res.success){
                      if(res.result.toothLocation==''){
                        res.result.toothLocation={topleft:[],topright:[],bottomleft:[],bottomright:[]}
                      }else{
                          res.result.toothLocation=JSON.parse(res.result.toothLocation)
                      }
                      
                      this.setState({...this.state,...res.result})
                  }else{
                    this.setState({
                        name,age,sex,clinicType,patientId,registrationDoctor,registrationDoctorCode,id:''
                    })
                  }

              }
        })
        dispatch({
            type:'today/classDict_getMenuList',
            payload:{hospCode:sessionStorage.getItem('hospCode')}
        })

        
    }
    columns=[
        {
            title:'明细项目',
            key:'',
            dataIndex:''
        },{
            title:'数量',
            key:'',
            dataIndex:''
        },{
            title:'单价',
            key:'',
            dataIndex:''
        },{
            title:'折扣率（%）',
            key:'',
            dataIndex:''
        },{
            title:'折后单价',
            key:'',
            dataIndex:''
        },{
            title:'操作',
            key:'cz',
            dataIndex:'cz'
        },
    ]
    
    closeModal=()=>{
        this.props.closeModal()
        
    }
    change=(e)=>{
        const {dispatch}=this.props
        const {rDetail}=this.props.today
        dispatch({
            type:'today/registrationMaster_updateRegistrationStatus',
            payload:{
                "clinicState": e,
                "hospCode": rDetail.hospCode,
                "patientId": rDetail.patientId,
                "visitId": rDetail.visitId
            },
            callback:res=>{
                if(res.success){
                    message.success('修改状态成功！')
                    dispatch({
                        type:'today/registrationMaster_getRegistrationById',
                        payload:{
                            "hospCode": rDetail.hospCode,
                            "patientId": rDetail.patientId,
                            "visitId": rDetail.visitId
                        },
                    })
                    this.props.search()
                }
            }
        })
    }
    onClose=()=>{
        this.props.closeModal()
    }
    openm=()=>{
        const {dispatch}=this.props
        dispatch({
            type:'today/visibleChange',payload:true,
        })
    }
    onChange=(key,value)=>{
        let obj=this.props.today.mrdetail
        obj[key]=value
        this.props.dispatch({
            type:'today/caseHistory_getCaseHistoryByIdR',
            payload:obj
        })
    }
    getTooth=(obj)=>{
        console.log(obj)
        this.setState({toothLocation:obj})
    }
    save=()=>{
        const {dispatch}=this.props
        let obj=this.state
        obj.toothLocation=JSON.stringify(obj.toothLocation)
        obj.visitId=this.props.today.rDetail.visitId
        obj.hospCode=sessionStorage.getItem('hospCode')
        dispatch({
            type:'today/caseHistory_saveOrUpdateCaseHistory',
            payload:obj,
            callback:res=>{
                if(res.success){
                    message.success('编辑成功！！')
                    this.onClose()
                }else{
                    message.error(res.msg)
                }
            }
        })
    }
    
    
    


    render() {
        // const {
        //     age,
        //     assistant,clinicType,diagnose,doctorAdvice,historyOfPresentIllness,inspectionReport,
        //     name,patientId,previousHistory,rayExamination,registrationDate,registrationDoctor,registrationDoctorCode,
        //     sex,symptom,treatment,visitId
        //   }=this.props.today.mrdetail
        let rTooth=[1,2,3,4,5,6,7,8]
        let lTooth=[8,7,6,5,4,3,2,1]
        const {
            name,
            sex,
            age,patientId,clinicType,registrationDoctor,registrationDoctorCode,
            registrationDate,toothLocation,symptom,historyOfPresentIllness,previousHistory,
            inspectionReport,rayExamination,diagnose,treatment,doctorAdvice,treatPlan
            
        }=this.state
        console.log(this.state)
        const {medicineVoList,diagnosisVoList}=this.props.today.menuObj
        
        
        return (
            <Drawer
            title={
                <div style={{display:'flex',justifyContent:'space-between',width:'calc(90vw)'}}>
                    <p>填写收费单</p>
                    <div style={{position:'relative',top:-4}} >
                        <Button type="primary" icon={'printer'} style={{marginRight:10}} >打印</Button>
                        <Button type="primary" onClick={this.save}>保存</Button>
                        
                    </div>
                </div>
            }
            placement="right"
            
            closable={true}
            onClose={this.onClose}
            // visible={this.props.today.fvisible}

            visible={true}
            width={'100%'}
            bodyStyle={{padding:0,display:'flex',alignItems:'center',justifyContent:'space-around',
            backgroundColor: '#f0f0f0'}}
            >
                <div className={'addfee'}>
                    
                
                <div style={{height:10}}></div>
                    <Row>
                        <Col span={4}>
                            <label >姓名：</label>
                            {name}
                        </Col>
                        <Col span={4}>
                            <label >性别：</label>
                            {sex==1?'男':'女'}
                        </Col>
                        <Col span={4}>
                            <label >年龄：</label>
                            {/* {age} */}
                        </Col>
                        <Col span={6}>
                            <label >病历号：</label>
                            {patientId}
                        </Col>
                        <Col span={6}>
                        
                        </Col>

                    </Row>
                    <div style={{height:20}}></div>
                    <Row>
                       <Col span={8}>
                            <label >医生：</label>
                            <Select style={{width:'160px'}} 
                            // defaultValue={registrationDoctor}
                            value={this.state.registrationDoctor}
                            onChange={(e,option)=>{
                                let obj=this.state
                                obj.registrationDoctor=option.props.item.userName
                                obj.registrationDoctorCode=option.props.item.id
                                this.setState({...this.state})
                            }}
                            >
                            {
                                this.props.staffManagement.staffList.filter(val=>val.job==1).map(val=>{
                                    return <Option key={val.userName} item={val}>
                                        {val.userName}
                                    </Option>
                                })
                            }
                            </Select>
                        </Col>
                        <Col span={8}>
                            <label >账单日期：</label>
                            <DatePicker 
                            value={registrationDate==''?null:moment(new Date(registrationDate))}
                            onChange={(date,dateString)=>{this.setState({registrationDate:dateString})}}

                            />
                        </Col>
                    </Row>
                    <div style={{height:10}}></div>
                    <div  style={{margin: '.5rem 0 1rem',height: 0,borderBottom: '1px dashed #dbdbdb'}}></div>
                    <div style={{height:10}}></div>
                    <Table
                       columns={this.columns}
                    ></Table>

                </div>
                <div className={'chooseFee'}>
                    <h2>收费项目</h2>
                    <div  style={{margin: '.5rem 0 1rem',height: 0,borderBottom: '1px dashed #dbdbdb'}}></div>
                    <Tree>
                        <TreeNode title={'诊疗类'} key={'a'}>
                        {
                                diagnosisVoList?.map(val=>{
                                    return <TreeNode key={val.classDict.id} title={val.classDict.className}>
                                        {
                                            val.priceDictList.map(item=>{
                                                return <TreeNode key={item.id} title={item.itemName}></TreeNode>
                                            })
                                        }
                                    </TreeNode>   
                                })
                            }
                        </TreeNode>
                        <TreeNode title={'药品类'} key={'b'}>
                            {
                                medicineVoList?.map(val=>{
                                    return <TreeNode key={val.classDict.id} title={val.classDict.className}>
                                        {
                                            val.priceDictList.map(item=>{
                                                return <TreeNode key={item.id} title={item.itemName}></TreeNode>
                                            })
                                        }
                                    </TreeNode>   
                                })
                            }
                        </TreeNode>
                    </Tree>

                </div>
                

              
            </Drawer>
            );
    }
}

export default AddFeeDra;
