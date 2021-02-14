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
const { Search } = Input;
const { Option } = Select;
@Form.create()
@withRouter
@connect(({ loading,  staffManagement,today,itemSetting}) => ({ loading, staffManagement,today,itemSetting}))
class CreateDra extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCondition:{
                input:'',
                state:'3',
            }
        };
    }
    handleOk=()=>{
        // let obj=this.props.form.getFieldsValue()
        // console.log(obj)
        const {dispatch}=this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let obj={
                    "patientMaster": {
                      "addrCity": "",
                      "addrCounty": "",
                      "addrDetailed": values.addrDetailed,
                      "addrProvince": "",
                      "age": values.age,
                      "areaCode": "",
                      "birth": "",
                      "clinicDate": values.clinicDate,
                      "clinicDoctor": values.clinicDoctor,
                      "clinicTagId": "",
                      "clinicType": 0,
                      "id": 0,
                      "identity": "",
                      "lastDate": "",
                      "name": values.name,
                      "patientId": values.patientId,
                      "phone": "string",
                      "remark": "string",
                      "sex": values.sex,
                      "tel": values.tel,
                      "vipCode": 0
                    },
                    "tagDictList": values.tagDictList
                  }
                  dispatch({
                      type:'today/patientMaster_savePatientMaster',
                      payload:obj,
                      callback:res=>{
                          
                      }
                  })
            }
          });
    }
    
    


    render() {
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
                title="新增员工"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.closeModal}
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
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="病历号">
                        {getFieldDecorator('patientId', {
                            initialValue:this.props.today.pid,
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
                        {getFieldDecorator('tel', {
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
                        })(<Input />)}
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
                        })(<Radio.Group  name="radiogroup">
                        <Radio value={1}>男</Radio>
                        <Radio value={2}>女</Radio>
                        
                      </Radio.Group>   )}
                    </Form.Item>
                    <Form.Item label="年龄">
                        {getFieldDecorator('age', {
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="地址">
                        {getFieldDecorator('addrDetailed', {
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="初诊医生">
                        {getFieldDecorator('clinicDoctor', {
                        })(
                            <Select>
                                {
                                    this.props.staffManagement.staffList.filter(val=>val.job==1).map(val=>{
                                        return <Option key={val.id}>
                                            {val.userName}
                                        </Option>
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="初诊日期">
                        {getFieldDecorator('clinicDate', {
                        })(
                            <DatePicker/>
                        )}
                    </Form.Item>
                    <Form.Item label="标签">
                        {getFieldDecorator('tagDictList', {
                            initialValue:[],
                        })(
                            <Select mode="multiple">
                                {
                                    this.props.today.tagList.filter(val=>val.tagCode!='').map(val=>{
                                        return <Option key={val.tagCode}>
                                            {val.tagName}
                                        </Option>
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                    

                </Form>
                
            </Modal>
            );
    }
}

export default CreateDra;
