import gen from './index';
import {API_EMR_TREAT,API} from '../utils/constant';
/**
 *  登录接口
 * @description 写入接口需要拼接 const API_EMR_TREAT='/api/emr/treat' 前缀
*/
const platform = {
  classDict_getClassDict:`POST /api/classDict/getClassDict`,
  priceDict_getPriceDictByClassId:`POST /api/priceDict/getPriceDictByClassId`,
  classDict_saveOrUpdateClassDict:`POST /api/classDict/saveOrUpdateClassDict`,
  classDict_deleteClassDictById:`POST /api/classDict/deleteClassDictById`,
  // priceDict_getPriceDictByClassId:`POST /api/priceDict/getPriceDictByClassId`
  priceDict_saveOrUpdatePriceDict:`POST /api/priceDict/saveOrUpdatePriceDict`,
  priceDict_deletePriceDictById:`POST /api/priceDict/deletePriceDictById`,
}

const APIFunction = {}
for (const key in platform) {
  APIFunction[key] = gen(platform[key])
}


export default APIFunction
