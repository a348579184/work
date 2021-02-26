/**
 * @page 费用补录
 * @description 搜索框和搜索结果组件
 * @props title 搜索框左侧标题
 * @props children 被该组件包裹的内容
 */

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, message,Radio, Checkbox, Modal,Form, DatePicker } from 'antd';
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

@Form.create()
@withRouter
@connect(({ loading,  staffManagement,today,itemSetting}) => ({ loading, staffManagement,today,itemSetting}))
class AddTooth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchCondition:{
                input:'',
                state:'3',
                patientDetail:{}
            },
            topright:[],
            topleft:[],
            bottomright:[],
            bottomleft:[],
            type:'1',
            way:[]
        };
        // this.selPatient=debounce(this.selPatient,500)
    }
    componentDidMount=()=>{
        console.log(this.props.tooth)
        const {topright,topleft,bottomright,bottomleft}=this.props.tooth
        this.setState({topright,topleft,bottomright,bottomleft})
    }
    closeModal=()=>{
        this.setState({
            topright:[],
            topleft:[],
            bottomright:[],
            bottomleft:[],
            type:'1',
            way:[]
        })
        const {dispatch}=this.props
        dispatch({
            type:'today/tvisibleChange',payload:false,
        })
    }
    handleOk=()=>{
        let {topright,topleft,bottomright,bottomleft}=this.state
        this.props.onOk({topright,topleft,bottomright,bottomleft})
        this.closeModal()
    }
    
    
    
    


    render() {
        
        return (
            <Modal
                title="选择牙位"
                visible={this.props.today.tvisible}
                onOk={this.handleOk}
                onCancel={this.closeModal}
                destroyOnClose={true}
                bodyStyle={{height:400,}}
                width={820}
            >
                <div className={'toothModal'}>
                <div style={{display:'flex',justifyContent:'space-around',paddingBottom:30}}>
                    <Radio.Group value={this.state.type} onChange={e=>{
                        this.setState({type:e.target.value,topright:[],
                            topleft:[],
                            bottomright:[],
                            bottomleft:[],})
                    }} buttonStyle="solid">
                        <Radio.Button value="1">恒牙</Radio.Button>
                        <Radio.Button value="2">乳牙</Radio.Button>
                        
                    </Radio.Group>
                </div>
                {/* <div style={{display:'flex',justifyContent:'space-around',paddingBottom:30}}>
                    <Checkbox.Group onChange={this.way} value={this.state.way}>
                        <Checkbox value={0}>
                            全口
                        </Checkbox>
                        <Checkbox value={1}>
                            上颚
                        </Checkbox>
                        <Checkbox value={2}>
                            下颚
                        </Checkbox>
                    </Checkbox.Group>
                    
                </div> */}

                    <div className={'toothBoxTop'}>
                        <div className={'toothLeft'}>
                            <div style={{width:'5.4rem',height:'6.2rem',display:this.state.type==2?'':'none'}}></div>
                            <Checkbox.Group value={this.state.topleft} onChange={e=>this.setState({topleft:e})}>
                                <Checkbox value={8} style={{display:this.state.type==2?'none':''}}>
                                    <div className={'tooth-left-up-8 partWidth'}></div>
                                </Checkbox>
                                
                                <Checkbox value={7} style={{display:this.state.type==2?'none':''}}>
                                    <div className={'tooth-left-up-7 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={6} style={{display:this.state.type==2?'none':''}}>
                                    <div className={'tooth-left-up-6 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={5}>
                                    <div className={'tooth-left-up-5 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={4}>
                                    <div className={'tooth-left-up-4 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={3}>
                                    <div className={'tooth-left-up-3 partWidth' }></div>
                                </Checkbox>
                                <Checkbox value={2}>
                                    <div className={'tooth-left-up-2 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={1}>
                                    <div className={'tooth-left-up-1 partWidth'}></div>
                                </Checkbox>
                                
                            </Checkbox.Group>

                        </div>
                        <div className={'toothRight'}>
                            <Checkbox.Group  value={this.state.topright} onChange={e=>this.setState({topright:e})}>
                                <Checkbox value={1}>
                                    <div className={'tooth-right-up-1 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={2}>
                                    <div className={'tooth-right-up-2 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={3}>
                                    <div className={'tooth-right-up-3 partWidth' }></div>
                                </Checkbox>
                                <Checkbox value={4}>
                                    <div className={'tooth-right-up-4 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={5}>
                                    <div className={'tooth-right-up-5 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={6} style={{display:this.state.type==2?'none':''}}>
                                    <div className={'tooth-right-up-6 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={7} style={{display:this.state.type==2?'none':''}}>
                                    <div className={'tooth-right-up-7 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={8} style={{display:this.state.type==2?'none':''}}>
                                    <div className={'tooth-right-up-8 partWidth'}></div>
                                </Checkbox>
                                
                            </Checkbox.Group>
                            <div style={{width:'5.4rem',height:'6.2rem',display:this.state.type==2?'':'none'}}></div>

                        </div>
                        
                    </div>
                    <div className={'toothBoxBottom'}>
                    <div className={'toothLeft'}>
                         <div style={{width:'5.4rem',height:'6.2rem',display:this.state.type==2?'':'none'}}></div>
                            <Checkbox.Group value={this.state.bottomleft} onChange={e=>this.setState({bottomleft:e})}>
                                <Checkbox value={8} style={{display:this.state.type==2?'none':''}}>
                                    <div className={'tooth-left-down-8 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={7} style={{display:this.state.type==2?'none':''}}>
                                    <div className={'tooth-left-down-7 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={6} style={{display:this.state.type==2?'none':''}}>
                                    <div className={'tooth-left-down-6 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={5}>
                                    <div className={'tooth-left-down-5 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={4}>
                                    <div className={'tooth-left-down-4 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={3}>
                                    <div className={'tooth-left-down-3 partWidth' }></div>
                                </Checkbox>
                                <Checkbox value={2}>
                                    <div className={'tooth-left-down-2 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={1}>
                                    <div className={'tooth-left-down-1 partWidth'}></div>
                                </Checkbox>
                                
                            </Checkbox.Group>

                        </div>
                        <div className={'toothRight'}>
                            <Checkbox.Group value={this.state.bottomright} onChange={e=>this.setState({bottomright:e})}>
                                <Checkbox value={1}>
                                    <div className={'tooth-right-down-1 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={2}>
                                    <div className={'tooth-right-down-2 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={3}>
                                    <div className={'tooth-right-down-3 partWidth' }></div>
                                </Checkbox>
                                <Checkbox value={4}>
                                    <div className={'tooth-right-down-4 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={5}>
                                    <div className={'tooth-right-down-5 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={6}  style={{display:this.state.type==2?'none':''}}>
                                    <div className={'tooth-right-down-6 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={7}  style={{display:this.state.type==2?'none':''}}>
                                    <div className={'tooth-right-down-7 partWidth'}></div>
                                </Checkbox>
                                <Checkbox value={8} style={{display:this.state.type==2?'none':''}}>
                                    <div className={'tooth-right-down-8 partWidth'} ></div>
                                </Checkbox>
                                
                            </Checkbox.Group>
                            <div style={{width:'5.4rem',height:'6.2rem',display:this.state.type==2?'':'none'}}></div>

                        </div>
                        
                    </div>
                    
                </div>
                
                
            </Modal>
            );
    }
}

export default AddTooth;
