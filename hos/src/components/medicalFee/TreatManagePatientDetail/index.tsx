/**
 * @page 治疗计划安排患者详情
*/

import React from 'react';
import { Row, Col, Descriptions, Skeleton } from 'antd';
import { connect } from 'dva';
import './index.less';

@connect(({ treatPlanManagement, loading }) => ({ treatPlanManagement, loading }))
class PatientDetail extends React.PureComponent {

    render() {
        const { effects } = this.props.loading;
        const { selectedPatientDetail } = this.props.treatPlanManagement;
        return (
            <div className="patient-detail">
                <Skeleton loading = {effects['treatPlanManagement/ApplyList']} active>
                    <div className = "patient-detail-body">
                        <Row span = {24}>
                            <Col span = {4} className = "patient-detail-body-title">
                                <label>姓名</label>
                            </Col>
                            <Col span = {4} className = "patient-detail-body-data">
                                <span>{selectedPatientDetail == undefined ? null : selectedPatientDetail.name}</span>
                            </Col>
                            <Col span = {4} className = "patient-detail-body-title">
                                <label>门诊号/住院号</label>
                            </Col>
                            <Col span = {4} className = "patient-detail-body-data">
                                <span>
                                    {
                                        selectedPatientDetail == undefined ? null:selectedPatientDetail.indexNo
                                    }
                                    {/* {selectedPatientDetail == undefined ? null : 
                                (selectedPatientDetail.visitId?selectedPatientDetail.visitId:selectedPatientDetail.outpNo)} */}
                                </span>
                            </Col>
                            <Col span = {4} className = "patient-detail-body-title">
                                <label>性别</label>
                            </Col>
                            <Col span = {4} className = "patient-detail-body-data">
                                <span>{selectedPatientDetail == undefined ? null : selectedPatientDetail.sex}</span>
                            </Col>

                        </Row>
                        <Row span={20}>
                            <Col span = {4} className = "patient-detail-body-title">
                                <label>年龄</label>
                            </Col>
                            <Col span = {4} className = "patient-detail-body-data">
                                <span>{selectedPatientDetail == undefined ? null : selectedPatientDetail.nage}</span>
                            </Col>
                            <Col span = {4} className = "patient-detail-body-title">
                                <label>患者属性</label>
                            </Col>
                            <Col span = {4} 
                                className = "patient-detail-body-data" title = {selectedPatientDetail == undefined ? null : selectedPatientDetail.chargeType}>
                                <span>{
                                selectedPatientDetail == undefined ? null : selectedPatientDetail.chargeType
                                }</span>
                            </Col>
                            <Col span = {4} className = "patient-detail-body-title">
                                <label>过敏史</label>
                            </Col>
                            <Col span = {4} className = "patient-detail-body-data" title = {selectedPatientDetail == undefined ? null : selectedPatientDetail.sourceName}>
                                <span>{selectedPatientDetail == undefined ? null : selectedPatientDetail.sourceName}</span>
                            </Col>
                        </Row>
                    </div>
                </Skeleton>
            </div>
        );
    }
}

export default PatientDetail;