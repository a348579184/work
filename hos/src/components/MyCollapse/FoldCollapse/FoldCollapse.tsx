/**
 * @description 可折叠面板组件内容
 * @props title 面板标题
 * @props restProps 传入的自定义属性
 * @props children 面板展开时显示的内容
*/

import React from 'react';
import { Icon, Button } from 'antd';
import './FoldCollapse.less';

class FoldCollapse extends React.Component {
    state = {
        isFold: true
    }
    handleOnFoldClick = () => {
        const { isFold } = this.state;
        this.setState({
            isFold: !isFold
        })
    }
    render() {
        return (
            <div className="fold-collapse">
                <div className="fold-collapse-block"></div>
                <div className="fold-collapse-title">
                    <span>{this.props.title}</span>&nbsp;&nbsp;
                    {
                        this.state.isFold ? <Icon type="caret-down" onClick={this.handleOnFoldClick} /> : <Icon type="caret-left" onClick={this.handleOnFoldClick} />
                    }
                    {/* <div className="fold-collapse-title-btn">
                        <Button size="small" onClick={this.handleOnFoldClick}>
                            {
                                this.state.isFold ? <Icon type="close" /> : <Icon type="plus" />
                            }
                        </Button>
                    </div> */}
                </div>
                <div className="fold-collapse-body" style={{ display: this.state.isFold ? 'block' : 'none' }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default FoldCollapse;
