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
const { doLogin} = api;


export default {
    namespace: 'platform',

    state: {

    },

    effects: {
        *platformLogin({ payload,callback}, { call, put }) {
            sessionStorage.setItem(platformToken,'sss')
            router.push('/BasicSettings/StaffManagement')
            let response=yield call(doLogin,payload)
        },
       

    },

    reducers: {
        
    },

    subscriptions :{
    },
};
