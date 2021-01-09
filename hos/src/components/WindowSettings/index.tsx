/***
 * 
 * 窗口关闭
 * 
 */
import React from "react";
import {Icon} from "antd";
import "./index.less";
export default function WindowSettings () {
  function handleMin(){
    window.winState ? window.winState.min() : console.dir("非嵌入模式");
  }
  function handleMax(){
    window.winState ? window.winState.max() : console.dir("非嵌入模式");
  }
  function handleClose(){
    window.winState ? window.winState.close() : console.dir("非嵌入模式");
  }
  function reload(){
    window.location.reload();
  }
  return(
    <div className="window-settings">
        <Icon type="redo" onClick={reload}/>
      <Icon type="minus" onClick={handleMin}/>
      <Icon type="border" onClick={handleMax}/>
      <Icon type="close" onClick={handleClose}/>
    </div>
  )
  
}