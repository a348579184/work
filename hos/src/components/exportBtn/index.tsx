import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './index.less';

class ExportBtn extends React.PureComponent {

    componentWillMount() {
        //获取接口，拆分为请求方式和请求路径
        const api = this.props.export_api;
        const paramsArray = api.split(' ');
        const method = paramsArray[0];
        const url = paramsArray[1];
        this.method = method;
        this.url = url;
    }

    handleOnDownload = () => {
        const data = this.props.data;
        const formElement = document.createElement('form');
        formElement.style.display = 'display:none;';
        formElement.method = this.method;
        formElement.action = this.url;
        formElement.target = 'callBackTarget';
        const inputElement = document.createElement('input');
        inputElement.type = 'hidden';
        inputElement.name = 'jsonData';
        inputElement.value = data;
        formElement.appendChild(inputElement);
        document.body.appendChild(formElement);
        formElement.submit();
        document.body.removeChild(formElement);
    }

    render() {
        const data = this.props.data;
        return (
            <Fragment>
                <Button className="button" onClick={this.handleOnDownload}>导出</Button>
            </Fragment>
        );
    }
}

ExportBtn.propsTypes = {
    export_api: PropTypes.string,   //请求api
    data: PropTypes.string  //请求参数
}

export default ExportBtn;