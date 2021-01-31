import React, { Component } from 'react';
import { Button, Input, Form, Select } from 'antd';
import { connect } from 'dva';
import WindowSettings from "@/components/WindowSettings";
import './index.less';
// import router from 'umi/router';
const { Option } = Select;

@connect(({ platform,loading }) => ({
  platform,loading
}))

class Index extends Component {
  onLogin = async(event) => {
    event.preventDefault()//阻止默认行为
    // router.push('./BookingManagement/Adjustment/AppointmentTime')
    
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
      this.onloginHandler(values);  
        
      }
    });
  }
  // 点击登录操作
    onloginHandler = async(values) => {
      const { dispatch,platform} = this.props;
     await dispatch({
        type: 'platform/platformLogin',
        payload:{...values,} ,
      });
    } 
  render() {
    const { getFieldDecorator } = this.props.form;
    const { platform,loading } = this.props;
    const { msg, department, departValue } = platform;
    const { effects } = loading;
    return (
      <div className='login-wrap login-bg'>
        {/* 治疗工作站窗口处理 */}
        <WindowSettings/>
        <div className="login-cont">
          <div className="inner">
            <div className="hd">
            </div>
            <Form onSubmit={this.onLogin}>
              <Form.Item className="login-item">
              {getFieldDecorator('userId', {
                rules: [{ required: true, message: '请输入用户名' }],
              })(
                <Input className="input-login-text" size="large" 
                onPressEnter={()=>{
                  console.log()

                  // document.getElementById('login_password').focus()
                }}
                ref={ref => this.inputAccount = ref} prefix={<i className="i-login-user"></i>} placeholder="请输入用户名" />
              )}
            </Form.Item>
              <Form.Item className="login-item">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input.Password className="input-login-text input-login-pwd" 
                id={'inp12'}
                onPressEnter={()=>{
                  // console.log(document.getElementById('login_partment'))
                  document.querySelector('loginBtn').focus()
                }}
                size="large" prefix={<i className="i-login-pwd"></i>} placeholder="请输入密码" />
              )}
            </Form.Item>
              <Form.Item className="login-item-btn">
              
                <Button htmlType="submit" type="primary" size="large" 
                id={'loginBtn'}
                className="login-btn nt-btn-primary " loading={effects["platform/platformLogin"]||effects["platform/getPlatformUserinfo"]} style={{ width: "100%" }} >登录</Button>
                <div className="login-error">{msg}</div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
const App = Form.create({ name: 'login' })(Index);
export default App;
