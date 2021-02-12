/**
 * @page 费用补录
 * @description 搜索框和搜索结果组件
 * @props title 搜索框左侧标题
 * @props children 被该组件包裹的内容
 */

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message, DatePicker, Spin, Checkbox,Popconfirm } from 'antd';
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
@connect(({ loading,  itemSetting}) => ({ loading, itemSetting}))
class ItemSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            type:'',
            record:{}
        };
    }
    columns=[
        {
            title:'序号',
            width:'50px',
            key:'xh',
            dataIndex:'xh',
            render:(text,record,index)=>index+1
        },{
            title:'就诊事项',
            width:'30%',
            key:'titalName',
            dataIndex:'titalName'
        },{
            title:'标签',
            width:'20%',
            key:'tagName',
            dataIndex:'tagName',
        
        },{
            title:'默认时长',
            width:'20%',
            key:'time',
            dataIndex:'time'
        },{
            title:'操作',
            width:'20%',
            key:'cz',
            dataIndex:'cz',
            render:(text,record,index)=>{
                return <div>
                           <a onClick={()=>this.edit(record)}>修改</a>
                           <Popconfirm
                                title="确认删除?"
                                onConfirm={()=>this.del(record)}
                                // onCancel={cancel}
                                okText='确认'
                                cancelText="取消"
                            >
                                <a style={{color:'red',marginLeft:'8px'}}>删除</a>
                            </Popconfirm>
                           
                       </div>
            }
        },
    ]
    componentDidMount(){
        const {dispatch}=this.props
        this.onSearch()
        dispatch({
            type:'itemSetting/tagDict_getPatientTag',
            payload:''

        })
    }
    onSearch=()=>{
        const {dispatch}=this.props
        dispatch({
            type:'itemSetting/tagDict_getRegistrationTag',
            payload:{tagList:[]}
        })
    }
    closeModal=()=>{
        this.setState({visible:false,type:'',record:{}})
    }
    open=()=>{
        this.setState({visible:true,type:'add'})
    }
    del=(record)=>{

    }
    edit=(record)=>{
        this.setState({visible:true,type:'edit',record})
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
                        <CreateDra visible={this.state.visible} closeModal={this.closeModal} onSearch={this.onSearch} type={this.state.type} record={this.state.record}/>
                        <Table 
                          columns={this.columns}
                          dataSource={this.props.itemSetting.itemList}
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
