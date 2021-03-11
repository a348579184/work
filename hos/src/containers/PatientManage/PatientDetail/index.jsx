/**
 * @page 费用补录
 * @description 搜索框和搜索结果组件
 * @props title 搜索框左侧标题
 * @props children 被该组件包裹的内容
 */

import React, { Fragment } from 'react';
import router from 'umi/router';
import { Select, Input, Button, Table, message,Radio, Checkbox, Modal,Form, DatePicker,Progress ,Drawer} from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash/debounce';
import withRouter from 'umi/withRouter';

import './index.less';
message.config({
    duration:3
})
const { Search,TextArea } = Input;
const { Option } = Select;

@Form.create()
@withRouter
@connect(({ loading,  staffManagement,today,itemSetting}) => ({ loading, staffManagement,today,itemSetting}))
class CreateRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        // this.selPatient=debounce(this.selPatient,500)
    }
    
    closeModal=()=>{
        this.props.closeModal()
        
    }
    
    
    


    render() {
        
        
        return (
            <Drawer
            title="客户详情"
            placement="right"
            closable={false}
            onClose={this.closeModal}
            // visible={this.props.visible}
            // visible={true}
            width={'60%'}
            >
              
            </Drawer>
            );
    }
}

export default CreateRegister;
