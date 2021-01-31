/*
 * @description:
 * @version:
 * @autor: 陈烨
 * @date: Do not edit
 * @lastEditors: Seven
 * @lastEditTime: Do not edit
 */
import router from 'umi/router';
import md5 from 'md5'
import api from '@/services/platform';
import { platformKey, isSuccess, platformToken } from '../utils/constant';
import { userInfo } from 'os';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
const { doLogin,staffDict_getStaffDictByUser} = api;


export default {
    namespace: 'platform',

    state: {

    },

    effects: {
        *platformLogin({ payload,callback}, { call, put }) {
            let response=yield call(doLogin,payload)
            if(response.success){
                let f=new FormData()
                f.append('userId',payload.userId)
                let userInfo=yield call(staffDict_getStaffDictByUser,f)
                sessionStorage.setItem(platformToken,'sss')
                sessionStorage.setItem('userInfo',JSON.stringify(userInfo.result))
                sessionStorage.setItem('hospCode',userInfo.result.hospCode)
                router.push('/BasicSettings/StaffManagement')
            }else{
                message.error(response.msg)
            }
        },
       

    },

    reducers: {
        
    },

    subscriptions :{
    },
};
