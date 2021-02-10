/**
 * @page 费用补录
 * @description 搜索框和搜索结果组件
 * @props title 搜索框左侧标题
 * @props children 被该组件包裹的内容
 */

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message, DatePicker, Spin, Checkbox } from 'antd';
import CreateDra from '@/containers/ItemSetting/CreateDra'
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash/debounce';
import withRouter from 'umi/withRouter';

// import './index.less';
message.config({
    duration:3
})
const { Search } = Input;
const { Option } = Select;

@withRouter
@connect(({ loading,  staffManagement}) => ({ loading, staffManagement}))
class ItemSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false
        };
    }
    columns=[
        {
            title:'序号',
            width:'50px',
            key:'xh',
            dataIndex:'xh'
        },{
            title:'就诊事项',
            width:'30%',
            key:'',
            dataIndex:''
        },{
            title:'颜色',
            width:'20%',
            key:'',
            dataIndex:'',
            render:(text,record,index)=>{

            }
        },{
            title:'默认时长',
            width:'20%',
            key:'',
            dataIndex:''
        },{
            title:'操作',
            width:'20%',
            key:'cz',
            dataIndex:'cz',
            render:(text,record,index)=>{

            }
        },
    ]
    componentDidMount(){
    }
    onSearch=()=>{

    }
    closeModal=()=>{}
    opne=()=>{
        this.setState({})
    }


    render() {
        const { children } = this.props;
        const title = this.props.title;
        
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
                        <Search
                                    
                            style={{ width: 200 ,marginRight:20,marginTop:-1}}
                        /> 
                        <Button type='primary' onClick={this.open}>新增就诊事项</Button>
                    </div>
                </div>
                {/* 搜索框包裹内容 */}
                <div className="research-body-content">
                    {/* 主体 */}
                    <div className="research-body-content-body">
                        <CreateDra visible={this.state.visible} closeModal={this.closeModal} search={this.search}/>
                        <Table 
                          columns={this.columns}
                        //   dataSource={}
                        >

                        </Table>
                    </div>
                    {/* 底部按钮 */}
                </div>
            </div>
        );
    }
}

export default ItemSetting;
