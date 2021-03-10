import React, { Fragment } from 'react';
import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import SubMenu from 'antd/lib/menu/SubMenu';
import Link from 'umi/link';
import "./layous.less";

const { SubMenu } = Menu;

class LeftMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    showSubMenu = (code) => {
        let auth = JSON.parse(sessionStorage.getItem('auth')), show = false
        auth.map((val) => {
            if (val.code == code) {
                show = true
            }
        })
        return show
    }

    render() {
        const { location } = this.props;
        return (
            <div 
            className={this.state.collapsed ? 'wrap-side-hide' : 'wrap-side'}
            >
                <div style={{ height: 'calc(100vh - 56px)' }}>
                    <div 
                    // className='menu-width'
                    >
                        <Menu
                            // selectedKeys={'/BasicSettings/StaffManagement'}
                            defaultOpenKeys={['TodayWork']}
                            defaultSelectedKeys={'/TodayWork/TodayWork'}
                            mode='inline'
                            inlineCollapsed={this.state.collapsed}
                            theme="light"
                            style={{ height: 'calc(100vh - 100px)', overflowY: 'auto', overflowX: 'hidden' }}
                        >
                            <SubMenu
                                key="TodayWork"
                                title={
                                    <Fragment>
                                        <Icon className="m-a-icon"/>
                                        <span>今日工作</span>
                                    </Fragment>
                                }

                            >
                                
                              <Menu.Item key="/TodayWork/TodayWork">
                                <Link to="/TodayWork/TodayWork">
                                  <span>今日工作</span>
                                </Link>
                              </Menu.Item>
                              
                            </SubMenu>
                            
                            <SubMenu
                                key="BasicSettings"
                                title={
                                    <Fragment>
                                        <Icon className="m-a-icon"/>
                                        <span>基础设置</span>
                                    </Fragment>
                                }

                            >
                                
                              <Menu.Item key="/BasicSettings/StaffManagement">
                                <Link to="/BasicSettings/StaffManagement">
                                  <span>员工管理</span>
                                </Link>
                              </Menu.Item>
                              <Menu.Item key="/BasicSettings/PatientManage">
                                <Link to="/BasicSettings/PatientManage">
                                  <span>患者管理</span>
                                </Link>
                              </Menu.Item>
                              <Menu.Item key="/BasicSettings/FeeItem">
                                <Link to="/BasicSettings/FeeItem">
                                  <span>收费项目</span>
                                </Link>
                              </Menu.Item>
                              <Menu.Item key="/BasicSettings/ItemSetting">
                                <Link to="/BasicSettings/ItemSetting">
                                  <span>就诊事项设置</span>
                                </Link>
                              </Menu.Item>
                            </SubMenu>

                            

                            



                        </Menu>
                    </div>
                </div>
                <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggleCollapsed} className='menu-Collapsed ' />
            </div>
        );
    }
}

export default withRouter(LeftMenu);
