import React from 'react';
import { Row, Col,  Skeleton } from 'antd';
import { connect } from 'dva';
import './index.less';

@connect(({ demo, loading }) => ({ demo, loading: loading.global }))
class PatientDetail extends React.PureComponent {
    getPatientDetail = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'demo/queryList',
            paylod: {}
        })
    }
    componentDidMount() {
        this.getPatientDetail();
    }
    render() {
        const { loading } = this.props;
        const { data } = this.props.demo;
        return (
            <div className="patient-detail">
                <Skeleton loading={loading} active>
                    <div className="patient-detail-body">
                        <Row span={24}>
                            <Col span={3} className="patient-detail-body-title">
                                <label>姓名</label>
                            </Col>
                            <Col span={3} className="patient-detail-body-data">
                                <span>{data.name}</span>
                            </Col>
                            <Col span={3} className="patient-detail-body-title">
                                <label>住院号</label>
                            </Col>
                            <Col span={3} className="patient-detail-body-data">
                                <span>{data.inpNo}</span>
                            </Col>
                            <Col span={2} className="patient-detail-body-title">
                                <label>性别</label>
                            </Col>
                            <Col span={3} className="patient-detail-body-data">
                                <span>{data.sex}</span>
                            </Col>
                            <Col span={3} className="patient-detail-body-title">
                                <label>年龄</label>
                            </Col>
                            <Col span={4} className="patient-detail-body-data">
                                <span>{data.age}</span>
                            </Col>
                        </Row>
                        <Row span={24}>
                            <Col span={3} className="patient-detail-body-title">
                                <label>就诊类型</label>
                            </Col>
                            <Col span={3} className="patient-detail-body-data">
                                <span>{data.diagnosisType}</span>
                            </Col>
                            <Col span={3} className="patient-detail-body-title">
                                <label>患者属性</label>
                            </Col>
                            <Col span={3} className="patient-detail-body-data">
                                <span>{data.patientType}</span>
                            </Col>
                            <Col span={2} className="patient-detail-body-title">
                                <label>过敏史</label>
                            </Col>
                            <Col span={3} className="patient-detail-body-data">
                                <span>{data.allergy}</span>
                            </Col>
                            <Col span={3} className="patient-detail-body-title">
                                <label>申请日期</label>
                            </Col>
                            <Col span={4} className="patient-detail-body-data">
                                <span>{data.applyDate}</span>
                            </Col>
                        </Row>
                        <Row span={24}>
                            <Col span={3} className="patient-detail-body-title">
                                <label>诊断</label>
                            </Col>
                            <Col span={21} className="patient-detail-body-data">
                                <label>{data.diagnosis}</label>
                            </Col>
                        </Row>
                    </div>
                </Skeleton>
            </div>
        );
    }
}

export default PatientDetail;