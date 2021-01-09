//中标文书调用方法集
const axios = require('axios');

//TODO: 等后端完成接口再调整

function docSaved(str) {
  console.dir('docSaved');
  console.dir(str);
  let data = {}
  data.str=str
  let formData = new FormData()
  formData.append("jsonData",JSON.stringify(data))
  axios.post('/api/emr/treat/treatRecord/insertTreatRecord',formData)
    .then(function (response) {
      // 成功处理
      console.log(response);
    })
    .catch(function (error) {
      // 失败处理
      console.log(error);
    })
    .then(function () {
      // 总会执行
    });
}

module.exports = {
  docSaved: docSaved,
};
