

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message,Radio, Checkbox, Modal,Form, DatePicker,Progress ,Row,Col,Drawer,Tree} from 'antd';
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
const {TreeNode}=Tree

@Form.create()
@withRouter
@connect(({ loading,  staffManagement,today,itemSetting,patient}) => ({ loading, staffManagement,today,itemSetting,patient}))
class AddFeeDra extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "costDetailsList": [
                // {
                //   "amount": "",
                //   "discountPrice": 0,
                //   "discountRate": "",
                //   "hospCode": "",
                //   "id": 0,
                //   "itemCode": "",
                //   "itemName": "",
                //   "patientId": "",
                //   "payDemandId": 0,
                //   "price": 0,
                //   "visitId": ""
                // }
              ],
              "payDemandNote": {
                "assistantCode": "",
                "assistantName": "",
                "doctorCode": "",
                "doctorName": "",
                "hospCode": sessionStorage.getItem('hospCode'),
                "id": '',
                "name": "",
                "patientId": "",
                "payNoteDate": "",
                "remark": "",
                "sex": "",
                "visitId": ""
              }
            
        };
        // this.selPatient=debounce(this.selPatient,500)
    }
    componentDidMount(){
        const {dispatch}=this.props
        // const {rDetail}=this.props.today
        // const {
        //     patientId,
        // sex,
        // age,
        // name,
        // visitId}=rDetail
        // dispatch({
        //     type:'today/payDemandNote_getPayDemandNote',
        //     payload:{
        //         "hospCode": sessionStorage.getItem('hospCode'),
        //         "patientId": patientId,
        //         "visitId": visitId
        //       },
        //       callback:res=>{
        //           if(res.success&&res.result.costDetailsList){
        //               this.setState({
        //                 payDemandNote:res.result.payDemandNote,
        //                 costDetailsList:res.result.costDetailsList,
        //               })
        //           }else{
                    
        //           }

        //       }
        // })
        dispatch({
            type:'today/classDict_getMenuList',
            payload:{hospCode:sessionStorage.getItem('hospCode')}
        })
        this.setState({
            ...this.props.patient.feeDetail
        })

        
    }
    columns=[
        {
            title:'明细项目',
            key:'itemName',
            dataIndex:'itemName'
        },{
            title:'数量',
            key:'amount',
            dataIndex:'amount',
            render:(text,record,index)=>{
                return <Input value={record.amount} onChange={e=>{
                    let amount=parseFloat(e.target.value)
                    let arr=this.state.costDetailsList
                    arr[index].amount=isNaN(amount)?'':amount
                    this.setState({costDetailsList:arr})
                    // if(){return}
                }}>

                </Input>
            }
        },{
            title:'单价',
            key:'price',
            dataIndex:'price'
        },{
            title:'折扣率（%）',
            key:'discountRate',
            dataIndex:'discountRate',
            render:(text,record,index)=>{
                return <Input value={record.discountRate} onChange={e=>{
                    let discountRate=parseFloat(e.target.value)
                    let arr=this.state.costDetailsList
                    arr[index].discountRate=isNaN(discountRate)?'':discountRate
                    if(!isNaN(discountRate)){
                        arr[index].discountPrice=parseFloat(arr[index].price)*arr[index].discountRate/100
                    }
                    this.setState({costDetailsList:arr})

                    // if(){return}
                }}>

                </Input>
            }

        },{
            title:'折后单价',
            key:'discountPrice',
            dataIndex:'discountPrice'
        },{
            title:'操作',
            key:'cz',
            dataIndex:'cz',
            render:(text,record,index)=>{
                return <div>
                    <a onClick={()=>{
                        let arr=this.state.costDetailsList
                        arr.splice(index,1)
                        this.setState({costDetailsList:arr})
                    }} style={{color:'red'}}>删除</a>
                </div>
            }
        },
    ]
    
    closeModal=()=>{
        this.props.closeModal()
        
    }
    change=(e)=>{
        const {dispatch}=this.props
        const {payDemandNote}=this.state
        dispatch({
            type:'today/registrationMaster_updateRegistrationStatus',
            payload:{
                "clinicState": e,
                "hospCode": sessionStorage.getItem('hospCode'),
                "patientId": payDemandNote.patientId,
                "visitId": payDemandNote.visitId
            },
            callback:res=>{
                if(res.success){
                    message.success('修改状态成功！')
                    dispatch({
                        type:'patient/costDetails_getCostDetailsList',
                        payload:{
                            "hospCode": sessionStorage.getItem('hospCode'),
                            "patientId": this.props.patient.show.detail.patientId
                        }
                    })
                }
            }
        })
    }
    onClose=()=>{
        // this.props.closeModal()
        const {dispatch,patient}=this.props
        dispatch({
            type:'patient/showChange',
            payload:{
                ...patient.show,
                show:true
            }
        })
        dispatch({
            type:'patient/feeDetailSet',
            payload:{}
        })
        dispatch({
            type:'patient/fvisibleChange',
            payload:false
        })
    }
    save=()=>{
        const {dispatch}=this.props
        let obj=this.state
        obj.visitId=this.props.today.rDetail.visitId
        obj.hospCode=sessionStorage.getItem('hospCode')
        let rc={
            "costDetailsList": this.state.costDetailsList,
            "payDemandNote": this.state.payDemandNote
          }
        dispatch({
            type:'today/payDemandNote_saveOrUpdatePayDemandNote',
            payload:rc,
            callback:res=>{
                if(res.success){
                    message.success('编辑成功！！')
                    this.onClose()
                }else{
                    message.error(res.msg)
                }
            }
        })
    }
    setList=(item)=>{
        console.log(item)
        // const {rDetail}=this.props.today
        const {
            patientId,
        sex,
        age,
        name,
        visitId}=this.state.payDemandNote
        let list=this.state.costDetailsList
        // let id=this.state.payDemandNote.id?this.state.payDemandNote.id:0
        let obj={
            "amount": "1",
            "discountPrice": item.price,
            "discountRate": "100",
            "hospCode": sessionStorage.getItem('hospCode'),
            "id": '',
            "itemCode": item.itemCode,
            "itemName": item.itemName,
            "patientId": patientId,
            "payDemandId": '',
            "price": item.price,
            "visitId": visitId
        }
        list.push(obj)
        this.setState({costDetailsList:list})
    }
    
    
    


    render() {
        
        const {
            name,
            sex,
            age,patientId,
            payNoteDate,
            
        }=this.state.payDemandNote
        const {medicineVoList,diagnosisVoList}=this.props.today.menuObj
        
        
        return (
            <Drawer
            title={
                <div style={{display:'flex',justifyContent:'space-between',width:'calc(90vw)'}}>
                    <p>填写收费单</p>
                    <div style={{position:'relative',top:-4}} >
                        {/* <Button type="primary" icon={'printer'} style={{marginRight:10}} >打印</Button> */}
                        <Button type="primary" onClick={this.save}>保存</Button>
                        
                    </div>
                </div>
            }
            placement="right"
            
            closable={true}
            onClose={this.onClose}
            // visible={this.props.today.fvisible}

            visible={true}
            width={'100%'}
            bodyStyle={{padding:0,display:'flex',alignItems:'center',justifyContent:'space-around',
            backgroundColor: '#f0f0f0'}}
            >
                <div className={'addfee'}>
                    
                
                <div style={{height:10}}></div>
                    <Row>
                        <Col span={4}>
                            <label >姓名：</label>
                            {name}
                        </Col>
                        <Col span={4}>
                            <label >性别：</label>
                            {sex==1?'男':'女'}
                        </Col>
                        <Col span={4}>
                            <label >年龄：</label>
                            {/* {age} */}
                        </Col>
                        <Col span={6}>
                            <label >病历号：</label>
                            {patientId}
                        </Col>
                        <Col span={6}>
                        
                        </Col>

                    </Row>
                    <div style={{height:20}}></div>
                    <Row>
                       <Col span={8}>
                            <label >医生：</label>
                            <Select style={{width:'160px'}} 
                            // defaultValue={registrationDoctor}
                            value={this.state.payDemandNote.doctorName}
                            onChange={(e,option)=>{
                                let obj=this.state.payDemandNote
                                obj.doctorName=option.props.item.userName
                                obj.doctorCode=option.props.item.id
                                this.setState({payDemandNote:obj})
                            }}
                            >
                            {
                                this.props.staffManagement.staffList.filter(val=>val.job==1).map(val=>{
                                    return <Option key={val.userName} item={val}>
                                        {val.userName}
                                    </Option>
                                })
                            }
                            </Select>
                        </Col>
                        <Col span={8}>
                            <label >账单日期：</label>
                            <DatePicker 
                            value={payNoteDate==''?null:moment(new Date(payNoteDate))}
                            onChange={(date,dateString)=>{
                                let obj=this.state.payDemandNote
                                obj.payNoteDate=dateString
                                this.setState({payDemandNote:obj})}}

                            />
                        </Col>
                    </Row>
                    <div style={{height:10}}></div>
                    <div  style={{margin: '.5rem 0 1rem',height: 0,borderBottom: '1px dashed #dbdbdb'}}></div>
                    <div style={{height:10}}></div>
                    <Table
                       columns={this.columns}
                       dataSource={this.state.costDetailsList}
                       pagination={false}
                    ></Table>

                </div>
                <div className={'chooseFee'}>
                    <h2>收费项目</h2>
                    <div  style={{margin: '.5rem 0 1rem',height: 0,borderBottom: '1px dashed #dbdbdb'}}></div>
                    <Tree defaultExpandedKeys={['a','b']}>
                        <TreeNode title={'诊疗类'} key={'a'}>
                        {
                                diagnosisVoList?.map(val=>{
                                    return <TreeNode key={val.classDict.id} title={val.classDict.className}>
                                        {
                                            val.priceDictList.map(item=>{
                                                return <TreeNode key={item.id} title={<span onClick={()=>{this.setList(item)}}>{item.itemName}</span>}></TreeNode>
                                            })
                                        }
                                    </TreeNode>   
                                })
                            }
                        </TreeNode>
                        <TreeNode title={'药品类'} key={'b'}>
                            {
                                medicineVoList?.map(val=>{
                                    return <TreeNode key={val.classDict.id} title={val.classDict.className}>
                                        {
                                            val.priceDictList.map(item=>{
                                                return <TreeNode key={item.id} title={<span onClick={()=>{this.setList(item)}}>{item.itemName}</span>}></TreeNode>
                                            })
                                        }
                                    </TreeNode>   
                                })
                            }
                        </TreeNode>
                    </Tree>

                </div>
                

              
            </Drawer>
            );
    }
}

export default AddFeeDra;
