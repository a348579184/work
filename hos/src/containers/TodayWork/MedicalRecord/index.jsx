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
    onClose=()=>{
        this.props.closeModal()
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
            closable={true}
            onClose={this.onClose}
            visible={this.props.today.mvisible}
            // visible={true}
            width={'100%'}
            

            >
              
            </Drawer>
            );
    }
}

export default CreateRegister;
