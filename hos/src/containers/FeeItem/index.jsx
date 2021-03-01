/*
 * @description: 
 * @version: 
 * @autor: 陈烨
 * @date: Do not edit
 * @lastEditors: Seven
 * @lastEditTime: Do not edit
 */


import React from 'react';
import { Select, Input, Tree, message, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import './index.less';
import { connect } from 'dva';
import moment from 'moment';
import CollapseBody from '@/components/MyCollapse';
const { DisableFoldCollapse, FoldCollapse } = CollapseBody;

const { TreeNode } = Tree;
const { Search } = Input;





@connect(({ setting }) => ({ setting }))
class TemplateResearch extends React.Component {
    state = {
        
    }
    componentDidMount() {

    }
    columns=[
        {
            title:'项目名',
            width:'50%',

        },
        {
            title:'价格',
            width:'30%',
            
        },{
            title:'操作',
            width:'20%',
            render:(text,record,index)=>{
                return <div>
                    <a >修改</a>
                    <a >删除</a>
                </div>  
            }
        },
    ]
    getNode=(val,ind)=>{
        return <div className={'node'}>
            <div className={'left'}>
                <span  style={{ paddingLeft: 10 }}>123</span>
            </div>
            <div className={'right'}>
                        <a
                            
                        >编辑</a>
                        <Popconfirm
                            title="确认删除?"
                            
                            // onCancel={cancel}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{ color: 'red' }}>删除</a>

                        </Popconfirm>

                    </div>




        </div>
    }
    
    



    render() {

        return (
            <div className="feeitem">
                <div className="research-head">
                    <div className="left-title">
                        <span>{this.props.title}</span>
                    </div>

                    <div className="right-research">
                    </div>
                </div>

                {/* <div className={this.props.isRowSelection ? "research-body-isRowSelection" : "research-body"}> */}
                <div className={"research-body"}>
                    <div className="research-result">
                        <div className="research-result-table-title">
                            <span>{}&nbsp;&nbsp;</span>
                        </div>
                        <Search style={{ marginBottom: 8, width: '80%', marginLeft: '10px' }} placeholder="请输入模板名称"/>
                        <div>
                            <div className={'treeBtn'}>
                                <a>+ 新增</a>
                            </div>
                            <Tree
                                defaultExpandAll={true}
                                
                            >
                                <TreeNode key={0} title={'诊疗类'}>
                                    <TreeNode key={12}
                                                    title={<span onClick={()=>this.treeClick(123)}>{this.getNode()}</span>}></TreeNode>
                                    </TreeNode>
                                
                                </Tree>
                        </div>

                    </div>

                    <div className="research-body-content" style={{ verticalAlign: 'top' }}>
                        <div className="research-content-body" >
                            {/* {this.props.children} */}
                            <DisableFoldCollapse >
                                <Table
                                  columns={this.columns}
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
