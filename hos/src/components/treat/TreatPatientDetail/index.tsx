import React from 'react';
import { Row, Col } from 'antd';
import './index.less';

class TrearPatientDetail extends React.PureComponent {
    render() {
        const data = this.props.data;
        return (
            <div className="patient-detail">
                <div className="patient-detail-body">
                    <Row span = {24}>
                        <Col span = {2} className = "patient-detail-body-title">
                            <label>姓名</label>
                        </Col>
                        <Col span = {2} className = "patient-detail-body-data">
                            <span>{data.name}</span>
                        </Col>
                        <Col span = {3} className = "patient-detail-body-title">
                            <label>住院号</label>
                        </Col>
                        <Col span = {3} className = "patient-detail-body-data">
                            <span>{data.inpNo}</span>
                        </Col>
                        <Col span = {3} className = "patient-detail-body-title">
                            <label>性别</label>
                        </Col>
                        <Col span = {3} className = "patient-detail-body-data">
                            <span>{data.sex}</span>
                        </Col>
                        <Col span = {3} className = "patient-detail-body-title">
                            <label>年龄</label>
                        </Col>
                        <Col span = {4} className = "patient-detail-body-data">
                            <span>{data.age}</span>
                        </Col>
                    </Row>
                    <Row span={24}>
                        <Col span = {2} className = "patient-detail-body-title">
                            <label>就诊类型</label>
                        </Col>
                        <Col span = {2} className = "patient-detail-body-data">
                            <span>{data.type}</span>
                        </Col>
                        <Col span = {3} className = "patient-detail-body-title">
                            <label>患者属性</label>
                        </Col>
                        <Col span = {3} className = "patient-detail-body-data">
                            <span>{data.patientType}</span>
                        </Col>
                        <Col span = {3} className = "patient-detail-body-title">
                            <label>过敏史</label>
                        </Col>
                        <Col span = {3} className = "patient-detail-body-data">
                            <span>{data.allergy}</span>
                        </Col>
                        <Col span = {3} className = "patient-detail-body-title">
                            <label>申请日期</label>
                        </Col>
                        <Col span = {4} className = "patient-detail-body-data">
                            <span>{data.applyDate}</span>
                        </Col>
                    </Row>
                    <Row span = {24}>
                        <Col span = {2} className = "patient-detail-body-title">
                            <label>诊断</label>
                        </Col>
                        <Col span = {8} className = "patient-detail-body-data">
                            <span>{data.diagnosis}</span>
                        </Col>
                        <Col span = {3} className = "patient-detail-body-title">
                            <label>诊断科室</label>
                        </Col>
                        <Col span = {11} className = "patient-detail-body-data">
                            <span>{data.diagnosisDept}</span>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default TrearPatientDetail;