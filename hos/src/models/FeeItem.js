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
import api from '@/services/FeeItem';
import { platformKey, isSuccess, platformToken } from '../utils/constant';
import { userInfo } from 'os';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
const {
    priceDict_getPriceDictByClassId,classDict_getClassDict
} = api;


export default {
    namespace: 'feeItem',

    state: {
        feeItemList:[],dictList:[],diagnosis:[],medicines:[]

    },

    effects: {
        *classDict_getClassDict({ payload,callback}, { call, put }) {
            let form=new FormData()
            form.append('hospCode',payload.hospCode)
            let res=yield call(classDict_getClassDict,form)
            if(res.success){
                yield put({
                    type:"classDict_getClassDictR",
                    payload:res.result
                })
            }
            callback(res)
        },
        *priceDict_getPriceDictByClassId({ payload,callback}, { call, put }) {
            let res=yield call(priceDict_getPriceDictByClassId,payload)
            if(res.success){
                yield put({
                    type:"priceDict_getPriceDictByClassIdR",
                    payload:res.result
                })
            }
            callback(res)
        },
    },

    reducers: {
        classDict_getClassDictR(state,action){
            return {
                ...state,
                diagnosis:action.payload.diagnosis,
                medicines:action.payload.medicines
            }
        },
        priceDict_getPriceDictByClassIdR(state,action){
            return {
                ...state,
                feeItemList:action.payload
            }
        },
        
    },

    subscriptions :{
    },
};
