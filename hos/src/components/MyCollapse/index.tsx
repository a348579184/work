/**
 * @description 面板组件暴露
 * @member CollapseBody 面板主体
 * @member FoldCollapse 可折叠面板
 * @member DisableFoldCollapse 不可折叠面板
*/

import CollapseBody from './CollapseBody/CollapseBody';
import FoldCollapse from './FoldCollapse/FoldCollapse';
import DisableFoldCollapse from './DisableFoldCollapse/DisableFoldCollapse';

CollapseBody.FoldCollapse = FoldCollapse;
CollapseBody.DisableFoldCollapse = DisableFoldCollapse;

export default CollapseBody;