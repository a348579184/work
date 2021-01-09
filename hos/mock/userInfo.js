import mockjs from 'mockjs';
import {
    delay
} from 'roadhog-api-doc';
//模拟网络延时 单位ms
const mock = {
  'POST /api/emr/treat/usersPassword/updatePswByUserAndOldPsw': (req,res) => {

    const { account, oldUserPwd,newUserPwd  } = req.body;
    if(account===1234 || account===9999){
      res.send({
        code: 200,
        data: true,
        message: "修改密码成功！"
      })
      return;
    }else{
      res.send({
        code: 200,
        data: true,
        message: "修改密码成功！"
       })
    }
   
    
  },
}
export default delay(mock, 200);