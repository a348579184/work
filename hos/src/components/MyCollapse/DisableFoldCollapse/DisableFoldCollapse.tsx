/**
 * @description 不可折叠面板组件内容
 * @props title 面板标题
 * @props restProps 传入的自定义属性
 * @props children 面板显示的内容
*/

import React from 'react';
import './DisableFoldCollapse.less';

const DisableFoldCollapse = ({ title, children, ...restProps }) => {
    return (
        <div className="disable-fold-collapse">
            <div className="disable-fold-collapse-block"></div>
            <div className="disable-fold-collapse-title">
                <span>{title}</span>
            </div>
            <div className="disable-fold-collapse-body">
                {children}
            </div>
        </div>
    );
}

export default DisableFoldCollapse;