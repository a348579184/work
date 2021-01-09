import React from 'react';
import { Button, Modal } from 'antd';

class TreatConfirmModal extends React.PureComponent {
  render() {
    return (
      <Modal
        title = "提示信息"
        visible = {this.props.visible}
        onOk = {this.props.handleOk}
        onCancel = {this.props.handleCancel}
        okText = '确认'
        width = {'400px'}
        cancelText = '取消'
        bodyStyle = {{ height: '115px' }}
        footer = {
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <Button type='primary' onClick={this.props.handleOk} style={{ width: '100px', height: '30px' }}>确认</Button>
            <Button onClick={this.props.handleCancel} style={{ width: '100px', height: '30px' }}>取消</Button>
          </div>
        }
      >
        <div style={{ textAlign: 'center' }}>
          <img
            src = {require('../../../assets/image/modal/modal.png')}
            style = {{ display: 'inline-block', paddingBottom: '14px' }}
            alt = ""/>
          <br/>
          {this.props.text}
        </div>
      </Modal>
    );
  }
}

export default TreatConfirmModal;
