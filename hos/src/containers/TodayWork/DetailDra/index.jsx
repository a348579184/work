/**
 * @page 费用补录
 * @description 搜索框和搜索结果组件
 * @props title 搜索框左侧标题
 * @props children 被该组件包裹的内容
 */

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message,Radio, Checkbox, Modal,Form, DatePicker,Progress ,Drawer} from 'antd';
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
    
    
    


    render() {
        const {rDetail}=this.props.today
        const {addrCity,
        addrCounty,
        addrProvince,
        addrDetailed,
        areaCode,
        clinicState,
        clinicTag,
        clinicTagId,

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
        
        return (
            <Drawer
            title="详细信息"
            placement="right"
            closable={false}
            onClose={this.closeModal}
            visible={this.props.visible}
            // visible={true}
            width={'70%'}
        >
          <div style={{display:'flex',justifyContent:'space-between'}}>
              <p>就诊流程</p>
              <div>
                  <a style={{marginRight:'10px',display:clinicState!=1?'none':'' }} onClick={()=>{this.change(2)}}>接诊</a>
                  <a style={{display:clinicState==3?'none':''}} onClick={()=>{this.change(3)}}>完成</a>
              </div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px'}}>
              <p style={{color:clinicState==1?'#1890ff':''}}>候诊中</p>
              <p style={{color:clinicState==2?'#1890ff':''}}>治疗中</p>
              <p style={{color:clinicState==3?'#1890ff':''}}>已完成</p>
          </div>
          
          <Progress percent={clinicState==1?0:(clinicState==2?50:100)} status="active" showInfo={false}/>
          <div  style={{margin: '.5rem 0 1rem',height: 0,borderBottom: '1px dashed #dbdbdb'}}></div>
          <div style={{display:'flex'}}>
              <h2>{name}</h2> <p style={{lineHeight:'36px',marginLeft:10}}>{patientId}</p>
          </div>
          <div className={'line-table'}>
                <div>
                  <div className={'title'}>性别：</div>
                    <div>{sex==1?'男':'女'}</div>
                </div>
                    <div>
                       <div className={'title'}>年龄：</div>
                       <div>{}</div>
                   </div>
                   <div>
                       <div className={'title'}>联系方式：</div>
                       <div>{phone}</div>
                   </div>
          </div>
          <div className={'line-table'}>
                <div>
                  <div className={'title'}>地址：</div>
                    <div>{addrDetailed}</div>
                </div>
                    
          </div>
          <Button onClick={this.props.openMedical}>编辑病历</Button>
          <Button onClick={this.props.openFee}>编辑收费单</Button>
        </Drawer>
            );
    }
}

export default CreateRegister;
