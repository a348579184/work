/**
 *
 * @description head--切换科室
 *
 * **/
import React,{ Component,Fragment} from "react";
import { Menu, Icon, Dropdown, Modal,Divider,Avatar,Button,Form,Input,Select} from 'antd';
import { connect } from 'dva';
const {Option}=Select
@connect(({userInfo,platform}) => ({
  userInfo,
  department:platform.department?platform.department:[],
  token:sessionStorage.getItem('user')==null?'':JSON.parse(sessionStorage.getItem('user')),
  tokendepart:JSON.parse(sessionStorage.getItem('depart')),
}))
class ChangeDepartments extends Component {
  // 科室Menu
  DepartmentsMenu =(department)=>{
    return  (
      <Menu style={{width:300 ,maxHeight:'200px',overflow: "overlay"}}  onClick={}>
        <Menu.Item key="Depart" disabled style= {{fontSize:20,fontWeight:500,color:"#000"}}>
            科室选择
        </Menu.Item>
        <Menu.Divider />
        <Select 
        showSearch
        optionFilterProp='children'
        filterOption={(input, option) =>{
          return option.props.uuu.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
          
        }
        style={{width:'260px',marginLeft:'12px'}}
        // width={'260px'}
        defaultValue={this.props.token.deptName}
        onChange={(e,option)=>this.setDepartments(e,option)}>
        {
          department && department.map((item,index) => {
            return(
              <Option key={item.deptCode+item.deptName}
               value={item.deptCode+item.deptName} 
               item={item}
               uuu={JSON.stringify(item)}
               >
                {item.deptName} 
              </Option>
            )
          })
        }
        </Select>
      </Menu>
    )
  }
  // 选择科室
  setDepartments = (e,option)=>{
    // console.log(e,option)
    // return
    const {token} = this.props;
    sessionStorage.setItem("user", JSON.stringify({...token,...option.props.item}));
    sessionStorage.setItem("deptCode", option.props.item.deptCode);
    window.location.reload(true);

  }
  render () {
    const {department,token,tokendepart} = this.props;
    return (
      <Fragment>
        {/* <Dropdown
          overlay={this.DepartmentsMenu(tokendepart)}
          placement="bottomLeft"
        >
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          {token && token.deptName}<Icon type="down" />
            <div className="mask-layer"></div>
          </a>
        </Dropdown> */}
      </Fragment>
    )
  }
}
export default  ChangeDepartments;
