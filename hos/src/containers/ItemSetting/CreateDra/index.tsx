/**
 * @page 费用补录
 * @description 搜索框和搜索结果组件
 * @props title 搜索框左侧标题
 * @props children 被该组件包裹的内容
 */

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message,Radio, Checkbox, Modal,Form ,Icon} from 'antd';
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
@connect(({ loading,  itemSetting}) => ({ loading, itemSetting}))
class CreateDra extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input:'',
            state:'3',
            tagType:'',
            tagName:'',
            tagCode:'',
        };
    }
    componentDidMount(){}
    handleOk=()=>{
        // let obj=this.props.form.getFieldsValue()
        // console.log(obj)
        const {dispatch,type,record}=this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
              if(type=='add'){
                  let obj={
                            "id": '',
                            "tagCode": "",
                            tagName:this.state.tagType=='new'?values.tagNameNew:values.tagName,
                            "time": values.time,
                            "titalCode": '',
                            "titalName": values.titalName
                        }
                   dispatch({
                       type:'itemSetting/titalDict_saveTitalDict',
                       payload:obj,
                       callback:(res)=>{
                           if(res.success){
                               message.success('新增成功！')
                               this.props.onSearch()
                               this.closeModal()
                               return
                           }else{
                               message.error(res.msg)
                           }
                       }
                   })
              }else{
                  let obj={
                            "id": record.id,
                            "tagCode": "",
                            tagName:values.tagName,
                            "time": values.time,
                            "titalCode": values.titalCode,
                            "titalName": values.titalName
                        }
                    if(this.state.tagType=='new'){
                        obj.tagName=values.tagNameNew
                        obj.tagCode=''
                    }else if(this.state.tagCode==''){
                        obj.tagName=record.tagName
                        obj.tagCode=record.tagCode
                    }else if(this.state.tagCode!=''){
                        obj.tagName=values.tagName
                        obj.tagCode=this.state.tagCode
                    }
                   dispatch({
                       type:'itemSetting/titalDict_updateTitalDict',
                       payload:obj,
                       callback:(res)=>{
                           if(res.success){
                               message.success('修改成功！')
                               this.props.onSearch()
                               this.closeModal()
                               return
                           }else{
                               message.error(res.msg)
                           }
                       }
                   })
              }
            }
          });
    }
    selOnchange=(e,option)=>{
        if(e=='new'){
            this.setState({tagType:'new'})
        }else{
            this.setState({tagCode:option.props.item.tagCode})
        }
    }
    closeModal=()=>{
        this.props.closeModal()
        this.setState({tagType:'',tagName:''})
    }
    
    


    render() {
        const { getFieldDecorator } = this.props.form;
        const {type,record}=this.props
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
                onCancel={this.closeModal}
                destroyOnClose={true}
            >
                <Form {...formItemLayout} onSubmit={this.handleOk}>
                 
                    <Form.Item label="名称">
                        {getFieldDecorator('titalName', {
                            initialValue:type=='edit'?record.titalName:'',
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                {
                                    required: true,
                                    message: '请输入名称！',
                                },
                                ],
                        })(<Input />)}
                    </Form.Item>
                    {
                        this.state.tagType=='new'?<Form.Item label="标签">
                        {getFieldDecorator('tagNameNew', {
                            initialValue:'',
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                {
                                    // required: true,
                                    message: '请输入标签！',
                                },
                                ],
                        })(<Input  suffix={<div onClick={()=>{this.setState({tagType:''})}} style={{position:'relative',zIndex:90,cursr:'pointer'}}><Icon type="arrow-left"   /></div>}/>)}
                    </Form.Item>:
                    <Form.Item label="标签">
                        {getFieldDecorator('tagName', {
                            initialValue:type=='edit'?record.tagName:'',
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                {
                                    // required: true,
                                    message: '请输入标签！',
                                },
                                ],
                        })(<Select onChange={this.selOnchange}>
                            <Option key='new'>
                                新增标签   
                            </Option>
                            {
                                this.props.itemSetting.tagList.map(val=><Option key={val.tagName} item={val}>
                                    {val.tagName}
                                </Option>)
                            } 
                        </Select>)}
                    </Form.Item>
                    }
                    <Form.Item label="时长">
                        {getFieldDecorator('time', {
                            initialValue:type=='edit'?record.time:'',
                            rules: [
                                // {
                                //     type: 'email',
                                //     message: 'The input is not valid E-mail!',
                                // },
                                {
                                    required: true,
                                    message: '请输入时长！',
                                    // type:'number'
                                },
                                ],
                        })( <Input />)}
                    </Form.Item>

                </Form>
                
            </Modal>
            );
    }
}

export default CreateDra;
