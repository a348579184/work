/**
 * @page 费用补录
 * @description 搜索框和搜索结果组件
 * @props title 搜索框左侧标题
 * @props children 被该组件包裹的内容
 */

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message,Radio, Checkbox, Modal,Form } from 'antd';
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
@connect(({ loading,  staffManagement}) => ({ loading, staffManagement}))
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
    componentDidMount(){
        if(this.props.type=='edit'){
            console.log(this.props.record)
            this.props.form.setFieldsValue({...this.props.record})
        }
    }
    handleOk=()=>{
        // let obj=this.props.form.getFieldsValue()
        // console.log(obj)
        const {dispatch}=this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let userInfo=sessionStorage.getItem('userInfo')
                 userInfo=JSON.parse(userInfo)
              if(this.props.type=='add'){
                if(values.password!=values.passwordTwo){
                    message.error('两次密码不一致，请确认！')
                    return
                }
                let obj={
                  "createName": userInfo.userName,
                  "createTime": "",
                  "hospCode": userInfo.hospCode,
                  "hospName": userInfo.hospName,
                  "id": '',
                  "job": values.job,
                  "jobPoint": '',
                  "password": values.password,
                  "signature": "",
                  "status": 0,
                  "tel": values.tel,
                  "updateName": userInfo.userName,
                  "updateId":userInfo.userId,
                  "updateTime": '',
                  "userId": values.userId,
                  "userName": values.userName
                }
                let staffDictList=[]
                staffDictList.push(obj)
                dispatch({
                    type:'staffManagement/staffDict_saveStaffDict',
                    payload:{
                      staffDictList
                    },
                    callback:res=>{
                        if(res.success){
                            message.success('新增成功！！')
                            this.props.closeModal()
                            this.props.search()
                        }else{
                            message.error(res.msg)
                        }
                    }
                })
              }else{
                  let {record}=this.props
                let obj={
                    "createName": record.createName,
                    "createTime": record.createTime,
                    "hospCode": userInfo.hospCode,
                    "hospName": userInfo.hospName,
                    "id": record.id,
                    "job": values.job,
                    "jobPoint": '',
                    "password": values.password1,
                    "signature": "",
                    "status": record.status,
                    "tel": values.tel,
                    "updateName": userInfo.userName,
                    "updateId":userInfo.userId,
                    "updateTime": '',
                    "userId": values.userId,
                    "userName": values.userName
                  }
                  let staffDictList=[]
                  staffDictList.push(obj)
                  dispatch({
                      type:'staffManagement/staffDict_updateStaffDictById',
                      payload:{
                        staffDictList
                      },
                      callback:res=>{
                          if(res.success){
                              message.success('修改成功！！')
                              this.props.closeModal()
                              this.props.search()
                          }else{
                              message.error(res.msg)
                          }
                      }
                  })

              }
              

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
                title={this.props.type=='add'?"新增员工":'编辑'}
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.props.closeModal}
                destroyOnClose={true}
            >
                <Form {...formItemLayout} onSubmit={this.handleOk}>
                <Form.Item label="类型">
                        {getFieldDecorator('job', {
                            initialValue:'1',
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                {
                                    required: true,
                                    message: '请输入工号！',
                                },
                                ],
                        })(<Radio.Group  defaultValue={1} name="radiogroup">
                        <Radio value={'1'}>医生</Radio>
                        <Radio value={'2'}>护士</Radio>
                        <Radio value={'3'}>前台</Radio>
                        <Radio value={'4'}>其他</Radio>
                      </Radio.Group>)}
                    </Form.Item>
                    <Form.Item label="登陆工号">
                        {getFieldDecorator('userId', {
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                {
                                    required: true,
                                    message: '请输入工号！',
                                },
                                ],
                        })(<Input disabled={this.props.type=='edit'}/>)}
                    </Form.Item>
                    <Form.Item label="姓名">
                        {getFieldDecorator('userName', {
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
                    <Form.Item label="登陆诊所">
                        {getFieldDecorator('hospCode', {
                            initialValue:userInfo.hospName,
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                {
                                    required: true,
                                    message: '请选择登陆诊所！',
                                },
                                ],
                        })(<Select disabled>

                        </Select>   )}
                    </Form.Item>
                    {
                        this.props.type=='add'?<Form.Item label="登陆密码">
                        {getFieldDecorator('password', {
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                {
                                    required: true,
                                    message: '请输入密码！',
                                },
                                ],
                        })(<Input />)}
                        </Form.Item>:''
                    
                    }
                    {
                        this.props.type=='add'? <Form.Item label="密码确认" style={{display:this.props.type=='edit'?'none':''}}>
                        {getFieldDecorator('passwordTwo', {
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                {
                                    required: true,
                                    message: '请再次输入密码',
                                },
                                ],
                        })(<Input />)}
                    </Form.Item>:''
                    }
                    {
                        this.props.type=='edit'?<Form.Item label="登陆密码" style={{display:this.props.type=='edit'?'':'none'}}>
                        {getFieldDecorator('password1', {
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                {
                                    // required: true,
                                    message: '请输入密码！',
                                },
                                ],
                        })(<Input />)}
                    </Form.Item>:''
                    }

                    
                   
                    <Form.Item label="手机号">
                        {getFieldDecorator('tel', {
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                // {
                                //     required: true,
                                //     message: '请再次输入密码',
                                // },
                                ],
                        })(<Input />)}
                    </Form.Item>

                </Form>
                
            </Modal>
            );
    }
}

export default CreateDra;
