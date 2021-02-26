/**
 * @page 费用补录
 * @description 搜索框和搜索结果组件
 * @props title 搜索框左侧标题
 * @props children 被该组件包裹的内容
 */

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message,Radio, Checkbox, Modal,Form, DatePicker,Progress ,Row,Col,Drawer} from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash/debounce';
import withRouter from 'umi/withRouter';
import ToothModal from '@/containers/TodayWork/MedicalRecord/ToothModal';

import './index.less';
message.config({
    duration:3
})
const { Search,TextArea } = Input;
const { Option } = Select;

@Form.create()
@withRouter
@connect(({ loading,  staffManagement,today,itemSetting}) => ({ loading, staffManagement,today,itemSetting}))
class CreateRegister extends React.Component {
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
                      if(res.result.toothLocation=='111'){
                        res.result.toothLocation={topleft:[],topright:[],bottomleft:[],bottomright:[]}
                      }
                      
                      this.setState({...this.state,...res.result})
                  }else{
                    this.setState({
                        name,age,sex,clinicType,patientId,registrationDoctor,registrationDoctorCode,
                    })
                  }

              }
        })

        
    }
    
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
            type:'today/tvisibleChange',payload:true,
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
        dispatch({
            type:'today/caseHistory_saveOrUpdateCaseHistory',
            payload:obj
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
        
        
        return (
            <Drawer
            title={
                <div style={{display:'flex',justifyContent:'space-between',width:'calc(90vw)'}}>
                    <p>填写病历</p>
                    <div style={{position:'relative',top:-4}} >
                        <Button type="primary" icon={'printer'} style={{marginRight:10}} >打印</Button>
                        <Button type="primary" onClick={this.save}>保存</Button>
                        
                    </div>
                </div>
            }
            placement="right"
            
            closable={true}
            onClose={this.onClose}
            visible={this.props.today.mvisible}
            // visible={true}
            width={'100%'}
            bodyStyle={{padding:0,display:'flex',alignItems:'center',justifyContent:'center',
            backgroundColor: '#f0f0f0'}}
            >
                <div className={'medicalRecord'}>
                    {
                        this.props.today.tvisible?<ToothModal onOk={this.getTooth} tooth={this.state.toothLocation}/>:''
                    }
                
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
                        <Radio.Group  buttonStyle="solid" value={clinicType} onChange={e=>this.setState({clinicType:e.target.value})}>
                            <Radio.Button value={1}>初诊</Radio.Button>
                            <Radio.Button value={2}>复诊</Radio.Button>
                        </Radio.Group>
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
                            <label >就诊日期：</label>
                            <DatePicker 
                            value={registrationDate==null?null:moment(new Date(registrationDate))}

                            />
                        </Col>
                    </Row>
                    <div style={{height:10}}></div>
                    <div  style={{margin: '.5rem 0 1rem',height: 0,borderBottom: '1px dashed #dbdbdb'}}></div>
                    <Row style={{height:50}}>
                       <Col span={24}>
                            <label >牙位：</label>
                            <div style={{display:'flex',width:'400px',flexWrap:'wrap',paddingBottom:'10px',cursor:'pointer'}} 
                                 className={'tooth'} onClick={this.openm}>
                                <div className={'toothPart'} >
                                    {
                                        lTooth.map(val=>{
                                            val=val+''
                                            let str=JSON.stringify(this.state.toothLocation.topleft)+''

                                            // console.log(str.indexOf('1'))
                                            return <div style={{color:'red'}}>{str.indexOf(val)>-1?val:''}</div>
                                        })
                                    }
                                </div>
                                <div className={'toothPart'} style={{borderLeft:'1px solid #11abda'}}>
                                    {
                                        rTooth.map(val=>{
                                            val=val+''
                                            let str=JSON.stringify(this.state.toothLocation.topright)+''

                                            // console.log(str.indexOf('1'))
                                            return <div style={{color:'red'}}>{str.indexOf(val)>-1?val:''}</div>
                                        })
                                    }
                                </div>
                                <div className={'toothPart'} style={{borderTop:'1px solid #11abda'}}>
                                    {
                                        lTooth.map(val=>{
                                            val=val+''
                                            let str=JSON.stringify(this.state.toothLocation.bottomleft)+''

                                            // console.log(str.indexOf('1'))
                                            return <div style={{color:'red'}}>{str.indexOf(val)>-1?val:''}</div>
                                        })
                                    }
                                </div>
                                <div className={'toothPart'} style={{borderTop:'1px solid #11abda',borderLeft:'1px solid #11abda'}}>
                                    {
                                        rTooth.map(val=>{
                                            val=val+''
                                            let str=JSON.stringify(this.state.toothLocation.bottomright)+''

                                            // console.log(str.indexOf('1'))
                                            return <div style={{color:'red'}}>{str.indexOf(val)>-1?val:''}</div>
                                        })
                                    }
                                </div>

                            </div>
                        </Col>
                        
                    </Row>
                    <Row>
                       <Col span={24}>
                            <label >主诉：</label>
                            <TextArea value={this.state.symptom}  onChange={e=>this.setState({symptom:e.target.value})}></TextArea>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >现病史：</label>
                            <TextArea value={this.state.historyOfPresentIllness}  onChange={e=>this.setState({historyOfPresentIllness:e.target.value})}></TextArea>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >既往史：</label>
                            <TextArea value={this.state.previousHistory} onChange={e=>this.setState({previousHistory:e.target.value})}></TextArea>
                        </Col>
                        
                    </Row>
                    <div style={{height:10}}></div>
                    <div  style={{margin: '.5rem 0 1rem',height: 0,borderBottom: '1px dashed #dbdbdb'}}></div>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >检查：</label>
                            <TextArea value={this.state.inspectionReport} onChange={e=>this.setState({inspectionReport:e.target.value})}></TextArea>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >X光检查：</label>
                            <TextArea value={this.state.rayExamination} onChange={e=>this.setState({rayExamination:e.target.value})}></TextArea>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >诊断：</label>
                            <TextArea value={this.state.diagnose} onChange={e=>this.setState({diagnose:e.target.value})}></TextArea>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >治疗计划：</label>
                            <TextArea value={this.state.treatPlan} onChange={e=>this.setState({treatPlan:e.target.value})}></TextArea>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >治疗：</label>
                            <TextArea value={this.state.treatment} onChange={e=>this.setState({treatment:e.target.value})}></TextArea>
                        </Col>
                        
                    </Row>
                    <div style={{height:10}}></div>
                    <div  style={{margin: '.5rem 0 1rem',height: 0,borderBottom: '1px dashed #dbdbdb'}}></div>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >医嘱：</label>
                            <TextArea value={this.state.doctorAdvice} onChange={e=>this.setState({doctorAdvice:e.target.value})}></TextArea>
                        </Col>
                        
                    </Row>
                </div>
                

              
            </Drawer>
            );
    }
}

export default CreateRegister;
