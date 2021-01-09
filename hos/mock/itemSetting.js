import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';

const mock = {
  //查询预约详情
  //获取患者预约信息
  'POST /api/emr/treat/treatResRec/getTreatResRec': mockjs.mock({
    code:200,
    'data|20': [{
        'checkNo|+1': 1, //报到登记序号
        'checkSourceType' : '@natural(0, 2)',//0-预约单申请、1-执行计划单、2-立即执行 
        'createDatetime': '@date(yyyy-MM-dd)',//登记操作时间 
        'creater': '@cname',//登记人名称 
        'createrCode': '@string("lower", 5, 20)',//登记人代码
        'endTime': '@date(yyyy-MM-dd)',//时段结束时间 
        'execDate' : '@date(yyyy-MM-dd)', //预约执行日期 
        'itemCode': '@string("lower", 5, 20)',//项目代码 
        'itemName': '@ctitle',//项目名称 
        'name': '@cname',//姓名 
        'outpNo': '@string("lower", 5, 20)',//门诊号 
        'patSource': '@city',// 患者来源 
        'patientId' : '@string("lower", 5, 20)',//患者ID 
        'planDetailNo': '@string("lower", 5, 20)',//计划安排明细序号 关联 treat_plan_detail 
        'serialNo': '@string("lower", 5, 20)',//当日登记流水号 
        'startTime': '@date(yyyy-MM-dd)',//时段开始时间 
        'timeStageNo': '@string("lower", 5, 20)', //预约时段序号 
        'treatReqNo' : '@string("lower", 5, 20)',//治疗申请单号 
        'validStatus' : 0,// 0未登记 2-已预约已登记 3-作废 
        'visitNo': '@string("lower", 5, 20)',//住院号 
        'week': '@natural(1,7)',//星期几
    }],
  }),
  //新增或调整预约
  'POST /api/emr/treat/treatResRec/insertOrUpdateTreatRes': (req, res) => {
    res.send({
        "code": 200,
        "data": true,
        "message": "string"
    });
  },
};

//模拟网络延时 单位ms
export default delay(mock, 2000);
