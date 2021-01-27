/**
 * @page 费用补录
 * @description 搜索框和搜索结果组件
 * @props title 搜索框左侧标题
 * @props children 被该组件包裹的内容
 */

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message, DatePicker, Spin, Checkbox } from 'antd';
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

@withRouter
@connect(({ loading,  }) => ({ loading, }))
class StaffManagementResearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCondition:{
                input:'',
                state:'',
            }
        };
    }


    render() {
        const { children } = this.props;
        const title = this.props.title;
        // const myDisabled=sessionStorage.getItem('platformToken')=='appointmentSystem'
        const myDisabled=false
        return (
            <div className="staffManagement">
                {/* 搜索头部 */}
                <div className="research-head">
                    {/* 头部左侧标题 */}
                    <div className="left-title">
                        <span>{title}</span>
                    </div>
                    {/* 右侧搜索项 */}
                    <div className="right-research">
                        <Button type='primary'>新增员工</Button>
                    </div>
                </div>
                {/* 搜索框包裹内容 */}
                <div className="research-body-content">
                    {/* 主体 */}
                    <div className="research-body-content-body">
                        <div class={'searchCondition'}>
                            <div>
                            <Search
                                placeholder="input search text"
                                value={this.state.searchCondition.input}
                                onSearch={value => {
                                    let obj=this.state.searchCondition
                                    obj.input=value
                                    this.setState({searchCondition:obj})
                                }}
                                style={{ width: 200 }}
                            /> 
                            </div>
                            <div>
                                <Select style={{ width: 200 }} 
                                   value={this.state.searchCondition.state}
                                   onChange={value => {
                                    let obj=this.state.searchCondition
                                    obj.state=value
                                    this.setState({searchCondition:obj})
                                   }}
                                >
                                    {/* <Option>全部状态</Option> */}
                                </Select>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    {/* 底部按钮 */}
                </div>
            </div>
        );
    }
}

export default StaffManagementResearch;
