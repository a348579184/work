/**
 * 
 * @description head--用戶修改密碼&&退出
 * 
 * **/ 
import React,{ Component,Fragment} from "react";
import { Menu, Icon, Dropdown, Modal,Button,Form,Input,message} from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import './index.less';
const { confirm } = Modal;
@connect(({userInfo,platform}) => ({
  userInfo,
  platform,
  token:JSON.parse(sessionStorage.getItem('user')),
  tokenuserInfo:JSON.parse(sessionStorage.getItem('userinfo')),
}))
class HeaderUser extends Component {
  state={
    modalVisible: false,        //修改密码弹框
    confirmDirty: false,        
  }
  // 确定修改密码
  changePasswordOK = () => {
    const {dispatch,form,token} = this.props;
    const {validateFields} = form;
   
    validateFields((err, values) => {
      const payloads= {
        account:token.user,
        oldUserPwd:values.oldUserPwd,
        newUserPwd:values.newUserPwd
      }
      if (!err) {
        dispatch({
          type:"userInfo/changeUserPassword",
          payload:payloads,
          callback:(code)=>{
            if(code==='200') {
              message.success('修改密码成功!');
              this.setState({
                modalVisible: false,
              })
            }else{
              message.error('原密码输入错误!');
            }
          }
        })
      }
    });
  }
  // 取消修改密码 
  changePasswordCancel = () => {
    this.setState({
      modalVisible: false,
    })
  }
  // 打开修改密码框 
  onModalVisible = () => {
    this.setState({
      modalVisible: true,
    })
  }
  //新密码校验
  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  // 确认密码校验
  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('newUserPwd')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  };
  //退出
  onClick=()=>{
    confirm({
        title: '确认退出?',
        content: '将注销登录',
        okText: '确认',
        cancelText: '取消',
        className: 'user-log-out',
        onOk() {
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("platformToken");
            sessionStorage.removeItem("deptCode");
            // sessionStorage.removeItem("depart");
            sessionStorage.removeItem("userinfo");
            // history.go(0)
            router.replace('/login');
        },
        onCancel() {
           
        },
    });
  }
  // 用户Menu
  userMenu = (
    <Menu>
        <Menu.Item  onClick={this.onModalVisible}>修改密码</Menu.Item>
        <Menu.Item onClick={this.onClick}>退出</Menu.Item>
    </Menu>
  );
  render () {
    const {form,tokenuserInfo} =this.props;
    const { getFieldDecorator } = form;
    return (
      <Fragment>
        <Dropdown
          overlay={this.userMenu}
          overlayClassName='am-mt-dropdown'
          placement='bottomRight'
        >
          <span className="header-dropdown-link" >
          {tokenuserInfo?tokenuserInfo.name:"李冰冰"} <Icon type="down" />
          </span>
        </Dropdown>
        <Modal
          title="修改密码"
          visible={this.state.modalVisible}
          closable={false}
          width="400px"
          footer={
            <div style={{ textAlign: 'center', paddingTop: '10px'}}>
              <Button className="bottom-save" onClick={this.changePasswordOK} type="primary" size={'large'}>
                确认
              </Button>
              <Button className="bottom-cancel" onClick={this.changePasswordCancel} style={{ marginRight: 8 }} size={'large'}>取消</Button>
            </div>
          }
        >{
        this.state.modalVisible&&<Form >
          <Form.Item label="原密码" className = "change-password-form-item">
            {getFieldDecorator('oldUserPwd', {
              rules: [
                { required: true, message: '请填写原密码!' },
              ],
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="原密码"
              />,
            )}
          </Form.Item>
          <Form.Item label="新密码" className = "change-password-form-item">
            {getFieldDecorator('newUserPwd', {
              rules: [
                { required: true, message: '请填写新密码!' },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="新密码"
              />,
            )}
          </Form.Item>
          <Form.Item label="确认新密码" className = "change-password-form-item">
            {getFieldDecorator('confirm', {
              rules: [
                { required: true, message: '请填写新密码!' },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(
              <Input.Password
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="确认新密码"
              />,
            )}
          </Form.Item>
        </Form>
        }
        </Modal>

      </Fragment>
    )
  }
}
export default  Form.create()(HeaderUser);
