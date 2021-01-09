/**
 * @description 治疗管理工作站header
 * */ 
import React, { Fragment, Component } from 'react';
import { Divider,} from 'antd';
import WindowSettings from "@/components/WindowSettings";
import HeaderUser from "@/containers/HeaderUser";
import ChangeDepartments from "@/containers/HeaderUser/ChangeDepartments";
import '../assets/styles/header.less';
import '../assets/styles/common.less';
export default class Header extends Component {
  render(){
    return (
      <Fragment>
        <div className='cm-header'>
          <div className="cm-header-left">
            <div className='logo'></div>
            <Divider type="vertical" />
            <div className="departments">
              {/* 切换科室 */}
              <ChangeDepartments/>
            </div>
          </div>
          <div className='user'>
            {/* 用户头像 */}
            {/* <div className="user-avatar">
            </div> */}
             <Divider type="vertical" />
            {/* 用戶信息-退出登录&&修改密码 */}
            <HeaderUser/>
           
          </div>
          {/*治疗管理工作站窗口设置 */}
          <WindowSettings/>
        </div>
      </Fragment>
    )
  }  
}
