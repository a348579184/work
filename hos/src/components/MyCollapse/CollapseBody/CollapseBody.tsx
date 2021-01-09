/**
 * @description 面板主体布局
*/

import React from 'react';
import './CollapseBody.less';

const CollapseBody = ({ children, ...restProps }) => {
    return (
        <div className="collapse-body">
            {
                React.Children.map(
                    children,
                    child => (child ? React.cloneElement(child, {}) : child)
                )
            }
        </div>
    )
}

export default CollapseBody;