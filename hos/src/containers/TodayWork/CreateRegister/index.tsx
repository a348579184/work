/**
 * @page 费用补录
 * @description 搜索框和搜索结果组件
 * @props title 搜索框左侧标题
 * @props children 被该组件包裹的内容
 */

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message,Radio, Checkbox, Modal,Form, DatePicker } from 'antd';
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
            searchCondition:{
                input:'',
                state:'3',
                patientDetail:{}
            },
        };
        // this.selPatient=debounce(this.selPatient,500)
    }
    handleOk=()=>{
        // let obj=this.props.form.getFieldsValue()
        // console.log(obj)
        let detail=this.state.patientDetail
        const {dispatch}=this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let obj={
                    "addrCity": "",
                    "addrCounty": "",
                    "addrDetailed": detail?.addrDetailed,
                    "addrProvince": "",
                    "age": detail?.age,
                    "areaCode": "",
                    "birth": detail?.birth,
                    "clinicDate": detail?.clinicDate,
                    "clinicDoctor": detail?.clinicDoctor,
                    "clinicState": detail?.clinicState,
                    "clinicTag": detail?.clinicTag,
                    "clinicTagId": "",
                    "clinicType": 0,
                    "id": 0,
                    "identity": "",
                    "lastDate": "",
                    "name": detail?.name,
                    "operationDate": '',
                    "patientId": detail.patientId,
                    "phone": detail?.phone,
                    "registrationDate": moment(new Date()).format('YYYY-MM-DD'),
                    
                    "sex": 0,
                    ...detail,
                    "remark": values.remark,
                    // clinicDate:'',operationDate:'',registrationDate:'',lastDate:'',
                    "tagDictList": values?.tagDictList,
                    "tel": "",
                    "vipCode": 0,
                    registrationDoctorCode:values.registrationDoctor,
                    hospCode:sessionStorage.getItem('hospCode')
                  }
                  this.props.staffManagement.staffList.map(val=>{
                      if(val.id==obj.registrationDoctorCode){
                          obj.registrationDoctor=val.userName
                      }
                  })
                  dispatch({
                      type:'today/registrationMaster_saveRegistrationMaster',
                      payload:obj,
                      callback:res=>{
                          if(res.success){
                              message.success('新增挂号成功！')
                              this.setState({patientDetail:{}})
                              this.closeModal()
                              this.props.search()
                          }else{
                              message.error(res.msg)
                          }
                      }
                  })
            }
          });
    }
    closeModal=()=>{
        this.props.closeModal()
        
    }
    selPatient=(e)=>{
        this.props.dispatch({
            type:'today/patientMaster_getPatientMasterByDto',
            payload:{
                "input": e,
                "selectStatus": 0
            },
            callback:res=>{
                
            }
        })
    }
    patientChange=(e,option)=>{
        let obj=option.props.item
        this.setState({patientDetail:obj})
        this.props.form.setFieldsValue({
            phone: obj.phone,patientId:obj.patientId,sex:obj.sex,age:obj.age
          });
        
    }
    
    


    render() {
        const {today}=this.props
        const { getFieldDecorator } = this.props.form;
        let userInfo=sessionStorage.getItem('userInfo')
        userInfo=JSON.parse(userInfo)
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
        return (
            <Modal
                title="新增挂号"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.closeModal}
                destroyOnClose={true}
                bodyStyle={{height:400,overflowY:'scroll'}}
            >
                <Form {...formItemLayout} onSubmit={this.handleOk}>
                
                    <Form.Item label="姓名">
                        {getFieldDecorator('name', {
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                {
                                    required: true,
                                    message: '请输入姓名！',
                                },
                                ],
                        })(
                            <Select 
                            // onSearch={this.selPatient}
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={this.patientChange}
                              
                             showSearch>
                                {
                                    today.patientList.map(val=>{
                                        return <Option key={val.id} title={val.name} item={val}>
                                            {val.name+'('+val.patientId+')'+'  '+val.tel}
                                            </Option>
                                    })
                                    
                                }
                                
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="病历号">
                        {getFieldDecorator('patientId', {
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                {
                                    // required: true,
                                    // message: '请输入姓名！',
                                },
                                ],
                        })(<Input disabled/>)}
                    </Form.Item>
                    <Form.Item label="手机号">
                        {getFieldDecorator('phone', {
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                {
                                    required: true,
                                    message: '请输入手机号',
                                },
                                ],
                        })(<Input disabled/>)}
                    </Form.Item>
                    <Form.Item label="性别">
                        {getFieldDecorator('sex', {
                            initialValue:'1',
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                
                                ],
                        })(<Radio.Group  name="radiogroup" disabled>
                        <Radio value={1}>男</Radio>
                        <Radio value={2}>女</Radio>
                        
                      </Radio.Group>   )}
                    </Form.Item>
                    <Form.Item label="年龄">
                        {getFieldDecorator('age', {
                        })(<Input disabled/>)}
                    </Form.Item>
                    <div  style={{margin: '.5rem 0 1rem',height: 0,borderBottom: '1px dashed #dbdbdb'}}></div>
                    <Form.Item label="就诊医生">
                        {getFieldDecorator('registrationDoctor', {
                        })(<Select>
                            {
                                this.props.staffManagement.staffList.filter(val=>val.job==1).map(val=>{
                                    return <Option key={val.id}>
                                        {val.userName}
                                    </Option>
                                })
                            }
                        </Select>)}
                    </Form.Item>
                    <Form.Item label="就诊日期">
                        {getFieldDecorator('clinicDate', {
                            initialValue:moment(new Date())
                        })(<DatePicker disabled/>)}
                    </Form.Item>

                    <Form.Item label="就诊事项">
                        {getFieldDecorator('tagDictList', {
                            initialValue:[],
                        })(
                            <Select 
                            mode="multiple"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                              }
                            >
                                {
                                    this.props.itemSetting.itemList.map(val=>{
                                        return <Option key={val.id}>
                                            {val.titalName}
                                        </Option>
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="备注">
                        {getFieldDecorator('remark', {
                            // initialValue:moment(new Date())
                        })(<TextArea rows={4} />)}
                    </Form.Item>
                    

                </Form>
                
            </Modal>
            );
    }
}

export default CreateRegister;
