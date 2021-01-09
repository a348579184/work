import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';

const mock = {
  'POST /api/emr/treat/treat/doLogin':(req, res) => {
    res.send({
      code: 200,
      data: true,
      message: "登录成功"
    });
  },
  'GET /api/emr/treat/staffDict/getDeptByEmpNoForLogin':(req, res) => {
    res.send({
      code: 200,
      data: [
        {
          "deptName":"财务办公室",
          "deptCode": "105012601"
        },
        {
          "deptName":"中医科门诊（住院会诊）",
          "deptCode": "103020201"
        },
        {
          "deptName":"营养科门诊（住院会诊）",
          "deptCode": "103030201"
        },
        {
          "deptName":"检验组",
          "deptCode": "101070201"
        },
      ],
      message: "操作成功"
    });
  },
  // 根据code查询员工信息
  'GET /api/emr/treat/staffDict/getStaffDictByCode':(req, res) => {
    res.send({
      code: 200,
      "data|1": [
        {
          "
          
          ": 0,
          "deptCode": "111",
          "empNo": "1111",
          "inputCode": "1111",
          "job": "1111",
          "name": "@cname",
          'sex|1': ['男', '女'],
          "title": "@ctitle()"
        }
      ],
      message: "操作成功"
    });
  },
};
//模拟网络延时 单位ms
export default delay(mock, 200);
