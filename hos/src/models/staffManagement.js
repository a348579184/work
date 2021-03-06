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
import api from '@/services/staffManagement';
import { platformKey, isSuccess, platformToken } from '../utils/constant';
import { userInfo } from 'os';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
const { staffDict_getStaffDict,staffDict_saveStaffDict,
    staffDict_delStaffDictById,
    staffDict_updateStaffDictById,
} = api;


export default {
    namespace: 'staffManagement',

    state: {
        staffList:[]

    },

    effects: {
        *staffDict_updateStaffDictById({ payload,callback}, { call, put }) {
            let res=yield call(staffDict_updateStaffDictById,payload)
            callback(res)
        },
        *staffDict_delStaffDictById({ payload,callback}, { call, put }) {
            let form=new FormData()
            form.append('id',payload.id)
            let res=yield call(staffDict_delStaffDictById,form)
            callback(res)
        },
        *staffDict_saveStaffDict({ payload,callback}, { call, put }) {
            let res=yield call(staffDict_saveStaffDict,payload)
            callback(res)
        },
        *staffDict_getStaffDict({ payload,callback}, { call, put }) {
            let res=yield call(staffDict_getStaffDict,payload)
            if(res.success){
                yield put({
                    type:'staffDict_getStaffDictR',
                    payload:res.result
                })
            }
        },
       

    },

    reducers: {
        staffDict_getStaffDictR(state,action){
            return {
                ...state,
                staffList:action.payload
            }
        },
        
    },

    subscriptions :{
    },
};
