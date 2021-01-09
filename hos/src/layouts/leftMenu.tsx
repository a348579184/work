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
            <div className={this.state.collapsed ? 'wrap-side-hide' : 'wrap-side'}>
                <div style={{ height: 'calc(100vh - 56px)' }}>
                    <div className='menu-width'>
                        <Menu
                            selectedKeys={[`${this.props.history.location.pathname === "/TreatManagement/ExecuteDetail" ? "/TreatManagement/Execute" : this.props.history.location.pathname}`]}
                            mode='inline'
                            inlineCollapsed={this.state.collapsed}
                            theme="Light"
                            style={{ height: 'calc(100vh - 100px)', overflowY: 'auto', overflowX: 'hidden' }}
                        >
                            {/* <SubMenu
                                key="MedicalAppointments"
                                title={
                                    <Fragment>
                                        <Icon className="m-a-icon"/>
                                        <span>治疗预约</span>
                                    </Fragment>
                                }

                            >
                                
                              <Menu.Item key="/MedicalAppointments/Plan">
                                <Link to="/MedicalAppointments/Plan">
                                  <span>预约登记管理</span>
                                </Link>
                              </Menu.Item>
                            </SubMenu> */}

                            



                        </Menu>
                    </div>
                </div>
                <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggleCollapsed} className='menu-Collapsed ' />
            </div>
        );
    }
}

export default withRouter(LeftMenu);
