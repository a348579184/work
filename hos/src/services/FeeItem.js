import gen from './index';
import {API_EMR_TREAT,API} from '../utils/constant';
/**
 *  登录接口
 * @description 写入接口需要拼接 const API_EMR_TREAT='/api/emr/treat' 前缀
*/
const platform = {
}

const APIFunction = {}
for (const key in platform) {
  APIFunction[key] = gen(platform[key])
}


export default APIFunction
