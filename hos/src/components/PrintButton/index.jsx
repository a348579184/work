/*@Description: 打印组件
 * @Author: your name
 * @Date: 2020-10-26 11:28:08
 * @LastEditTime: 2020-10-26 12:37:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react_nurse\react_medical_advice_management\src\components\PrintButton\index.jsx
 */
import React, { Component, Fragment } from 'react'
import { Dropdown, Menu, Button, message } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'dva'

class PrintButton extends Component {
  handleClick = (e, printType, printParams, onClick) => {
    const token = sessionStorage.getItem('platformToken');
    console.log(window)
    if (window.printTool) {
      //当入参为空时提示
      for (let i = 0; i < printParams.length; i++) {
        if (printParams[i].value === "") {
          message.destroy();
          message.warning("请选择需要打印的数据！");
          return;
        }
      }
      window.printTool.print(
        printType, // 第一个参数固定不变
        JSON.stringify(printParams),//第二个参数 value 是勾选的变更单的 serialNo 字段字符串逗号分隔，
        token, //  第三个参数是 token
        e.key                                     // 第四个参数0是预览  1是打印
      )
    } else {
      message.warn('无法预览或打印！');
    }
  };

  render() {
    const { printParams, printType, onClick, btnText, printOnly } = this.props
    const menu = (
      <Menu onClick={(e) => this.handleClick(e, printType, printParams, onClick)}>
        <Menu.Item key={0}>
          预览
        </Menu.Item>
        <Menu.Item key={1}>
          打印
        </Menu.Item>
      </Menu>
    );
    return (
      <Fragment>
        {
          printOnly ? (
            <Button key={1} type={this.props.buttonType} onClick={() => this.handleClick({ key: 1 }, printType, printParams, onClick)} style={this.props.style}>{btnText}</Button>
          ) : (
              <Dropdown overlay={menu}>
                <Button key={1} type={this.props.buttonType} onClick={() => this.handleClick({ key: 1 }, printType, printParams, onClick)} style={this.props.style}>{btnText}</Button>
              </Dropdown>
            )
        }
      </Fragment>
    )
  }

}
// eslint-disable-next-line react/no-typos
PrintButton.PropTypes = {
  printParams: PropTypes.array,  // 所需打印的数据
  printType: PropTypes.string,  // 打印单名字
  onClick: PropTypes.func,     //回调时间
  btnText: PropTypes.string,    //打印btn文字
  buttonType: PropTypes.string,   //按钮的风格样式
  style: PropTypes.element,//按钮样式
  printOnly: PropTypes.bool,//是否只展示打印功能
}
PrintButton.defaultProps = {
  printParams: [],
  printType: '',
  onClick: () => { },
  btnText: '打印',
  buttonType: 'primary',
  printOnly: false
};
export default PrintButton;