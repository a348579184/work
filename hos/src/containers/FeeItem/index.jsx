/*
 * @description: 
 * @version: 
 * @autor: 陈烨
 * @date: Do not edit
 * @lastEditors: Seven
 * @lastEditTime: Do not edit
 */


import React from 'react';
import { Select, Input, Tree, message, Popconfirm ,Table,Modal,Form} from 'antd';
import PropTypes from 'prop-types';
import './index.less';
import { connect } from 'dva';
import moment from 'moment';
import CollapseBody from '@/components/MyCollapse';
const { DisableFoldCollapse, FoldCollapse } = CollapseBody;

const { TreeNode } = Tree;
const { Search } = Input;




@Form.create()
@connect(({ setting ,feeItem}) => ({ setting,feeItem }))
class TemplateResearch extends React.Component {
    state = {
        addClass:{
            type:'',
            class:null,
            input:'',
            visible:false
        },
        classObj:{},
        addItem:{
            type:'',
            visible:false
        },
        classClick:{},itemRecord:{}
    }
    componentDidMount() {
        this.getClass()

    }
    getClass=()=>{
        const {dispatch}=this.props
        dispatch({
            type:'feeItem/classDict_getClassDict',
            payload:{hospCode:sessionStorage.getItem('hospCode')}
        })
    }
    columns=[
        {
            title:'项目名',
            width:'50%',
            key:'itemName',
            dataIndex:'itemName'
        },
        {
            title:'价格',
            width:'20%',
            key:'price',
            dataIndex:'price',
            render:text=>'￥'+text
        },{
            title:'单位',
            width:'20%',
            key:'unit',
            dataIndex:'unit',
        },{
            title:'操作',
            width:'10%',
            render:(text,record,index)=>{
                return <div>
                    <a onClick={()=>{this.editItem(record)}}>修改</a>
                    <Popconfirm
                            title="确认删除?"
                            
                            onConfirm={()=>this.delItem(record)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{marginLeft:8,color:'red'}}>删除</a>

                        </Popconfirm>
                    
                </div>  
            }
        },
    ]
    delClass=(val)=>{
        const {dispatch}=this.props
        dispatch({
            type:'feeItem/classDict_deleteClassDictById',
            payload:val,
            callback:res=>{
                if(res.success){
                    message.success('删除成功！')
                    this.getClass()
                }else{
                    message.error(res.msg)
                }
            }
        })
    }
    delItem=(val)=>{
        const {dispatch}=this.props
        dispatch({
            type:'feeItem/priceDict_deletePriceDictById',
            payload:val,
            callback:res=>{
                if(res.success){
                    message.success('删除成功！')
                    this.treeClick(this.state.classClick)
                }else{
                    message.error(res.msg)
                }
            }
        })
    }
    editClass=(val)=>{
        this.setState({classObj:val,
            addClass:{
                type:'edit',
                class:'',
                input:val.className,
                visible:true
            }
        })
    }
    getNode=(val,ind)=>{
        return <div className={'node'}>
            <div className={'left'}>
                <span  style={{ paddingLeft: 10 }}>{val.className}</span>
            </div>
            <div className={'right'}>
                        <a
                            onClick={()=>this.editClass(val)}
                        >编辑</a>
                        <Popconfirm
                            title="确认删除?"
                            
                            onConfirm={()=>this.delClass(val)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{ color: 'red' }}>删除</a>

                        </Popconfirm>

                    </div>




        </div>
    }
    addClass=(u,input)=>{
        this.setState({addClass:{
            type:'add',
            class:u,
            input,
            visible:true
        }

        })

    }
    handleClassCancel=()=>{
        this.setState({addClass:{
            type:'',
            class:null,
            input:'',
            visible:false
        }})
    }
    
    handleClassOk=()=>{
        const {dispatch}=this.props
        let obj={
            "classCode": "",
            "className": "",
            "hospCode": sessionStorage.getItem('hospCode'),
            "id": '',
            "priceType": ""
        }
        if(this.state.addClass.type=='add'){
            obj.priceType=this.state.addClass.class
            obj.className=this.state.addClass.input
        }else{
            obj=this.state.classObj
            obj.className=this.state.addClass.input
        }
        dispatch({
            type:'feeItem/classDict_saveOrUpdateClassDict',
            payload:obj,
            callback:res=>{
                if(res.success){
                    if(this.state.addClass.type=='add'){
                        message.success('新增成功')
                    }else{
                        message.success('修改成功')
                    }
                    this.getClass()
                    this.handleClassCancel()
                }else{
                    message.error(res.msg)
                }
            }
        })
    }
    treeClick=(val)=>{
        this.props.dispatch({
            type:'feeItem/priceDict_getPriceDictByClassId',
            payload:{
                classId:val.id,
                hospCode:sessionStorage.getItem('hospCode'),
                input:''
            }
        })
        let arr=[]
        arr[0]=val.id
        this.setState({classClick:val,selectedKeys:arr})
    }
    addItem=()=>{
        this.setState({addItem:{visible:true,type:'add'}})
    }
    handleItemCancel=()=>{
        this.setState({addItem:{visible:false,type:''}})
    }
    handleItemOk=()=>{
        const {dispatch}=this.props
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let {addItem,classClick,itemRecord}=this.state
                let item={
                    "className": classClick.className,
                    "classType": classClick.priceType,
                    "hospCode":sessionStorage.getItem('hospCode'),
                    "id": '',
                    "inputCode": "",
                    "itemCode": '',
                    "itemName": values.itemName,
                    "price": values.price,
                    "unit": values.unit
                  }
                if(addItem.type=='add'){
                    dispatch({
                        type:'feeItem/priceDict_saveOrUpdatePriceDict',
                        payload:item,
                        callback:res=>{
                            if(res.success){
                                message.success('新增成功！')
                                this.treeClick(this.state.classClick)
                                this.handleItemCancel()
                            }else{
                                message.error(res.msg)
                            }
                        }
                    })
                }else{
                    item.id=itemRecord.id
                    item.itemCode=itemRecord.itemCode
                    item.inputCode=itemRecord.inputCode
                    dispatch({
                        type:'feeItem/priceDict_saveOrUpdatePriceDict',
                        payload:item,
                        callback:res=>{
                            if(res.success){
                                message.success('修改成功！')
                                this.treeClick(this.state.classClick)
                                this.handleItemCancel()
                            }else{
                                message.error(res.msg)
                            }
                        }
                    })


                }
            }
          });

    }
    editItem=(record)=>{
        // const {dispatch}=this.props
        this.setState({
            addItem:{type:'edit',visible:true},itemRecord:record
        })
    }
    
    



    render() {
        const {feeItem}=this.props
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 4 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };
        const {addItem,itemRecord}=this.state
        return (
            <div className="feeitem">
                <div className="research-head">
                    <div className="left-title">
                        <span>{this.props.title}</span>
                    </div>

                    <div className="right-research">
                    </div>
                </div>
                <Modal
                    title={this.state.addClass.type=='add'?'新增类别':'修改类别'}
                    visible={this.state.addClass.visible}
                    onOk={this.handleClassOk}
                    onCancel={this.handleClassCancel}
                >
                    <Input value={this.state.addClass.input} onChange={(e)=>{
                        let obj=this.state.addClass
                        obj.input=e.target.value
                        this.setState({addClass:obj})}}
                        placeholder='请输入类别名称'
                    ></Input>
                </Modal> 

                {/* <div className={this.props.isRowSelection ? "research-body-isRowSelection" : "research-body"}> */}
                <div className={"research-body"}>
                    <div className="research-result">
                        <div className="research-result-table-title">
                            <span>{}&nbsp;&nbsp;</span>
                        </div>
                        {/* <Search style={{ marginBottom: 8, width: '80%', marginLeft: '10px' }} placeholder="请输入模板名称"/> */}
                        <div>
                            <div className={'treeBtn'}>
                                <a onClick={()=>this.addClass(1,'')}>+ 新增</a>
                            </div>
                            <Tree
                                defaultExpandAll={true}
                                selectedKeys={this.state.selectedKeys}
                                
                            >
                                <TreeNode key={0} title={'诊疗类'}>
                                    {
                                        feeItem.diagnosis.map(val=>{
                                            return <TreeNode key={val.id}
                                            title={<span onClick={()=>this.treeClick(val)}>{this.getNode(val)}</span>}>

                                            </TreeNode>
                            
                                        })
                                    }
                                    </TreeNode>
                                    
                                
                                </Tree>
                        </div>
                        <div>
                            <div className={'treeBtn'}>
                                <a onClick={()=>this.addClass(2,'')}>+ 新增</a>
                            </div>
                            <Tree
                                defaultExpandAll={true}
                                selectedKeys={this.state.selectedKeys}
                                
                            >
                                    <TreeNode key={0} title={'药品类'}>
                                    {
                                        feeItem.medicines.map(val=>{
                                            return <TreeNode key={val.id}
                                            title={<span onClick={()=>this.treeClick(val)}>{this.getNode(val)}</span>}>

                                            </TreeNode>
                            
                                        })
                                    }
                                    </TreeNode>
                                
                                </Tree>
                        </div>

                    </div>
                    <Modal
                        title={this.state.addItem.type=='add'?'新增项目':'修改项目'}
                        visible={this.state.addItem.visible}
                        onOk={this.handleItemOk}
                        onCancel={this.handleItemCancel}
                        destroyOnClose={true}
                    >
                        <Form {...formItemLayout} onSubmit={this.handleItemOk}>
                            <Form.Item label="项目名称">
                                {getFieldDecorator('itemName', {
                                    initialValue:addItem.type=='edit'?itemRecord.itemName:'',
                                    rules: [
                                        // {
                                        //     type: 'email',
                                        //     message: 'The input is not valid E-mail!',
                                        // },
                                        {
                                            required: true,
                                            message: '请输入工号！',
                                        },
                                        ],
                                })(<Input/>)}
                            </Form.Item>
                            <Form.Item label="价格">
                                {getFieldDecorator('price', {
                                    initialValue:addItem.type=='edit'?itemRecord.price:'',
                                    rules: [
                                        // {
                                        //     type: 'email',
                                        //     message: 'The input is not valid E-mail!',
                                        // },
                                        {
                                            required: true,
                                            message: '请输入价格！',
                                        },
                                        ],
                                })(<Input/>)}
                            </Form.Item>
                            <Form.Item label="单位">
                                {getFieldDecorator('unit', {
                                    initialValue:addItem.type=='edit'?itemRecord.unit:'',
                                    rules: [
                                        // {
                                        //     type: 'email',
                                        //     message: 'The input is not valid E-mail!',
                                        // },
                                        {
                                            required: true,
                                            message: '请输入单位！',
                                        },
                                        ],
                                })(<Input/>)}
                            </Form.Item>
                        </Form>
                        
                    </Modal> 

                    <div className="research-body-content" style={{ verticalAlign: 'top' }}>
                        <div className="research-content-body" >
                            {/* {this.props.children} */}
                            <DisableFoldCollapse title={this.state.classClick.className}>
                                <div style={{textAlign:'right',paddingBottom:6,marginTop:-28}}>
                                    <a onClick={()=>{this.addItem()}} style={{display:this.state.classClick.className?'':'none'}}>新增</a>
                                </div>
                                <Table
                                  columns={this.columns}
                                  dataSource={feeItem.feeItemList}
                                  pagination={false}
                                 ></Table>
                            </DisableFoldCollapse>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}



export default TemplateResearch;
