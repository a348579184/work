/**
 * @page 费用补录
 * @description 搜索框和搜索结果组件
 * @props title 搜索框左侧标题
 * @props children 被该组件包裹的内容
 */

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message,Radio, Checkbox, Modal,Form, DatePicker,Progress ,Drawer,Tabs,Popconfirm} from 'antd';
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
const { Search,TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

@Form.create()
@withRouter
@connect(({ loading,  staffManagement,today,itemSetting,patient}) => ({ loading, staffManagement,today,itemSetting,patient}))
class CreateRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        // this.selPatient=debounce(this.selPatient,500)
    }
    componentDidMount(){
        const {dispatch}=this.props
        dispatch({
            type:'today/registrationMaster_getRegistrationByPatientId',
            payload:{
                "hospCode": sessionStorage.getItem('hospCode'),
                "patientId": this.props.patient.show.detail.patientId
            },
            callback:res=>{
                dispatch({
                    type:'patient/visitListSet',
                    payload:res.result
                })
            }
        })
    }
    visitColumns=[
        {
            title:'序号',
            dataIndex:'xh',
            key:'xh',
            width:80,
            render:(text,record,index)=>index+1
        },
        {
            title:'就诊日期',
            dataIndex:'registrationDate',
            key:'registrationDate'
        },{
            title:'就诊医生',
            dataIndex:'registrationDoctor',
            key:'registrationDoctor'
        },{
            title:'就诊事项',
            // dataIndex:'registrationDoctor',
            // key:'registrationDoctor'
        },

    ]
    
    closeModal=()=>{
        const {dispatch}=this.props
        dispatch({
            type:'patient/showChange',
            payload:{
                show:false,
                detail:{}
            }
        })
         
    }
    del=()=>{
        const {dispatch}=this.props
        dispatch({
            type:'patient/',
            payload:''
        })
    }
    medicalClick=async (record)=>{
        const {dispatch,patient}=this.props
        dispatch({
            type:'patient/showChange',
            payload:{
                ...patient.show,
                show:false
            }
        })
        await dispatch({
            type:'patient/rDetailSet',
            payload:record
        })
        dispatch({
            type:'patient/mvisibleChange',
            payload:true
        })
    }
    


    render() {
        const {visitList,show}=this.props.patient
        
        
        return (
            <Drawer
            title={
                <div style={{display:'flex',justifyContent:'space-between',width:'calc(55vw)'}}>
                    <p>客户详情</p>
                    <div style={{position:'relative',top:-4}} >
                        {/* <Button type="primary" icon={'printer'} style={{marginRight:10}} >打印</Button> */}
                        {/* <Button type="primary" onClick={this.del}>删除</Button> */}
                        <Popconfirm
                            title="确认删除?"
                            
                            onConfirm={()=>this.del}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{color:'red',fontSize:14}}>删除</a>

                        </Popconfirm>
                        
                        
                    </div>
                </div>
            }
            placement="right"
            closable={false}
            onClose={this.closeModal}
            // visible={this.props.visible}
            visible={true}
            width={'60%'}
            >
                <div style={{padding:12}}>
                    <div>
                        <h2>{show?.detail?.name}（{show?.detail?.patientId}）</h2>

                    </div>

                </div>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="电子病历" key="1">
                        <Table
                          columns={this.visitColumns}
                          dataSource={visitList}
                          onRow={(record)=>{
                              return {
                                  onClick:()=>{
                                      this.medicalClick(record)
                                  }
                              }
                          }}
                        >

                        </Table>
                    </TabPane>
                    <TabPane tab="付款结算" key="2">
                    Content of Tab Pane 2
                    </TabPane>
                    
                </Tabs>
              
            </Drawer>
            );
    }
}

export default CreateRegister;
