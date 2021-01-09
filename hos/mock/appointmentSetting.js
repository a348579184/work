import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';

const mock = {
    //根据预约科室查询日期详情
    // 'POST /api/treat/treatTimeConfig/getResNum': mockjs.mock({
    //   data: {
        
    //   }
    // }),
    //调整人数
    'POST /api/emr/treat/treatTimeConfig/updateResNum': (req, res) => {
        res.send({
            "code": 200,
            "data": true,
            "message": "string"
        });
    },

    //获取患者列表
    'POST /api/emr/treat/treatResRec/getResPatList': mockjs.mock({
        code:200,
        'data|20': [{
            'admissionDateTime': '@date(yyyy-MM-dd)', //入院时间 
            'chargeType': null,//费别 
            'deptAdmissionTo': '@string("lower", 5, 20)',//入院科室code 
            'deptName' : null,//入院科室 
            'diagnosisDesc': '@cparagraph(1)', //诊断描述 
            'nage': '@natural(1, 100)', //年龄 
            'name' : '@cname',//姓名 
            'patSource': '@city',//患者来源 
            'patientId': '@string("lower", 5, 20)',//病人ID 
            'sex': '@string("男女",1,1)',//性别 
            'sourceName': '@cparagraph(1)',//过敏史 
            'visitId': '@string("lower", 5, 20)',//住院号
        }],
      }),

      //取消预约
      'POST /api/emr/treat/treatResRec/cancelResTreat': (req, res) => {
        res.send({
            "code": 0,
            "data": true,
            "message": "string"
        });
    },
  };
  
  //模拟网络延时 单位ms
  export default delay(mock, 2000);