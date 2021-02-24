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
            
        };
        // this.selPatient=debounce(this.selPatient,500)
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
    
    
    


    render() {
        
        
        return (
            <Drawer
            title={
                <div style={{display:'flex',justifyContent:'space-between',width:'calc(90vw)'}}>
                    <p>填写病历</p>
                    <div style={{position:'relative',top:-4}} >
                        <Button type="primary" icon={'printer'} style={{marginRight:10}} >打印</Button>
                        <Button type="primary">保存</Button>
                        
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
                <div style={{height:10}}></div>
                    <Row>
                        <Col span={4}>
                            <label >姓名：</label>
                            chenye
                        </Col>
                        <Col span={4}>
                            <label >性别：</label>
                            男
                        </Col>
                        <Col span={4}>
                            <label >年龄：</label>
                            55岁
                        </Col>
                        <Col span={6}>
                            <label >病历号：</label>
                            123456
                        </Col>
                        <Col span={6}>
                        <Radio.Group  buttonStyle="solid">
                            <Radio.Button value="large">初诊</Radio.Button>
                            <Radio.Button value="default">复诊</Radio.Button>
                        </Radio.Group>
                        </Col>

                    </Row>
                    <div style={{height:20}}></div>
                    <Row>
                       <Col span={8}>
                            <label >医生：</label>
                            <Select style={{width:'160px'}}></Select>
                        </Col>
                        <Col span={8}>
                            <label >就诊日期：</label>
                            <DatePicker/>
                        </Col>
                    </Row>
                    <div style={{height:10}}></div>
                    <div  style={{margin: '.5rem 0 1rem',height: 0,borderBottom: '1px dashed #dbdbdb'}}></div>
                    <Row>
                       <Col span={24}>
                            <label >主诉：</label>
                            <TextArea></TextArea>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >现病史：</label>
                            <TextArea></TextArea>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >既往史：</label>
                            <TextArea></TextArea>
                        </Col>
                        
                    </Row>
                    <div style={{height:10}}></div>
                    <div  style={{margin: '.5rem 0 1rem',height: 0,borderBottom: '1px dashed #dbdbdb'}}></div>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >检查</label>
                            <TextArea></TextArea>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >X光检查：</label>
                            <TextArea></TextArea>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >诊断：</label>
                            <TextArea></TextArea>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >治疗计划：</label>
                            <TextArea></TextArea>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >治疗：</label>
                            <TextArea></TextArea>
                        </Col>
                        
                    </Row>
                    <div style={{height:10}}></div>
                    <div  style={{margin: '.5rem 0 1rem',height: 0,borderBottom: '1px dashed #dbdbdb'}}></div>
                    <Row style={{marginTop:20}}>
                       <Col span={24}>
                            <label >医嘱：</label>
                            <TextArea></TextArea>
                        </Col>
                        
                    </Row>
                </div>
                

              
            </Drawer>
            );
    }
}

export default CreateRegister;
