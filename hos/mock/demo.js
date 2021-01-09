import mockjs from 'mockjs';
import {
  delay
} from 'roadhog-api-doc';

const mock = {
  'GET /api/emr/treat/patientDetail': mockjs.mock({
    data: {
      name: "王小帅",
      inpNo: "63569854",//住院号
      sex: "男",
      age: "28岁",
      diagnosisType: "住院",
      patientType: "医保",//患者属性
      allergy: "无",
      applyDate: "2020-03-10 11:30",
      diagnosis: "脊椎前倾",//诊断
      diagnosisDept: '外科'
    }
  }),
};

//模拟网络延时 单位ms
export default delay(mock, 200);
