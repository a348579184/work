import gen from './index';
import {API_EMR_TREAT,API} from '../utils/constant';
/**
 *  登录接口
 * @description 写入接口需要拼接 const API_EMR_TREAT='/api/emr/treat' 前缀
*/
const platform = {
  treat_secretLogin:`POST ${API_EMR_TREAT}/treat/secretLogin`,
  platform_login: `POST ${API_EMR_TREAT}/treat/doLogin`,
  // 根据code获取用户信息
  platform_userinfo: `api/emr/treat-dict/staffDict/getStaffDictByCodeForLogin`,
  platform_departName: `api/emr/treat-dict/staffVsGroup/getDeptByEmpNoForLogin`,
  staffVsGroup_getMenuAuth:`POST ${API_EMR_TREAT}-dict/staffVsGroup/getMenuAuth`,
}

const APIFunction = {}
for (const key in platform) {
  APIFunction[key] = gen(platform[key])
}


export default APIFunction
