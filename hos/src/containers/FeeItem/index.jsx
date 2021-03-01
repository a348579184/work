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
                                
                            </Tree>
                        </div>

                    </div>

                    <div className="research-body-content" style={{ verticalAlign: 'top' }}>
                        <div className="research-content-body" >
                            {/* {this.props.children} */}
                            <DisableFoldCollapse >
                                {/* <TemplateTable /> */}
                            </DisableFoldCollapse>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}



export default TemplateResearch;
