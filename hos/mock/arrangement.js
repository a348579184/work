import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';

const mock = {
  //患者列表
  'POST /api/emr/treat/treatResRec/getResPatList': mockjs.mock({
    code:200,
    'data|20': [
    //   {
    //   reportDept: '@city',
    //   'number|+1': 1,
    //   'patientId|10000-20000': 1,
    //   completionDate: '@now("second")',
    //   'outpatient|300000-400000': 1,
    //   name: '@cname',
    //   sex: '@string("男女",1,1)',
    //   'age|1-99': 1,
    //   isExamined: '@string("是否",1,1)',
    //   occupation: '@String("有无",1,1)',
    //   address: '@county(true)',
    //   diseaseName: '@ctitle',
    // }
    {
      "patientId": "42667",
      "visitId|+1": 1,
      "name": "@cname",
      sex: '@string("男女",1,1)',
      "nage": null,
      "admissionDateTime": null,
      "patSource": null,
      "sourceName": null,
      "chargeType": null,
      "deptAdmissionTo": null,
      "deptName": "妇科一区",
      "diagnosisDesc": null
  }
  ],
  }),
  //患者详情
  'POST /api/emr/treat/treatResRec/getTreatResRec':mockjs.mock({
    code:200,
    'data|20':  [
      {
        "applyDatetime": "@DATETIME('yyyy-MM-dd HH:mm:ss')",
        "applyDoctor": "@cname",
        "checkNo": '@number',
        "createDatetime": "@DATETIME('yyyy-MM-dd HH:mm:ss')",
        "creater": "@cname",
        "createrCode": "string",
        "endTime": "8:00",
        "execDate": "@DATETIME('yyyy-MM-dd HH:mm:ss')",
        "itemCode": "string",
        "itemName": "string",
        "name": "string",
        "outpNo": "string",
        "patSource": "string",
        "patientId": "string",
        "resNo": 0,
        "startTime": "7:00",
        "timeStageNo": 0,
        "treatReqNo": "string",
        "validStatus|1": [0,1,2,3],
        "visitNo": "3"
      }
    ],
  }),
  //取消
  'POST /api/emr/treat/treatResRec/cancelResTreat':mockjs.mock({
    code:200,
    data:true
  }),
  //根据日期科室查询当天预约详情
  'POST /api/emr/treat/treatTimeConfig/getResNum':mockjs.mock({
    
      "code": 200,
      "data": [
        {
          "amPmFlag": 'am',
          "completeNum": 0,
          "createDatetime": "2020-04-06T06:28:17.495Z",
          "creater": "string",
          "createrCode": "string",
          "deptCode": "string",
          "deptName": "string",
          "endTime": "8:30",
          "execDate": "2020-04-06T06:28:17.496Z",
          "extendNum": 0,
          "maxNum": 0,
          "ordinaryNum": 50,
          "remainderNum": 33,
          "sortNo": 0,
          "startTime": "8:00",
          "timeName": "string",
          "timeStageNo": 0,
          "validStatus": "string",
          "week": "string"
        },
        {
          "amPmFlag": 'pm',
          "completeNum": 0,
          "createDatetime": "2020-04-06T06:28:17.495Z",
          "creater": "string",
          "createrCode": "string",
          "deptCode": "string",
          "deptName": "string",
          "endTime": "3:30",
          "execDate": "2020-04-06T06:28:17.496Z",
          "extendNum": 0,
          "maxNum": 0,
          "ordinaryNum": 60,
          "remainderNum": 12,
          "sortNo": 0,
          "startTime": "3:00",
          "timeName": "string",
          "timeStageNo": 0,
          "validStatus": "string",
          "week": "string"
        },
      ],
      "message": "string"
    
  }),
  //调整人数
  'POST /api/emr/treat/treatTimeConfig/updateResNum':mockjs.mock({
    code:200,
    'data': [] ,
  }),
  //保存预约
  'POST /api/emr/treat/treatResRec/insertOrUpdateTreatRes':mockjs.mock({
    code:200,
    'data': [] ,
  }),
};

//模拟网络延时 单位ms
export default delay(mock, 200);
