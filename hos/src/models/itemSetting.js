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
import api from '@/services/itemsetting';
import { platformKey, isSuccess, platformToken } from '../utils/constant';
import { userInfo } from 'os';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
const { tagDict_getRegistrationTag,titalDict_saveTitalDict,
    titalDict_updateTitalDict,tagDict_getPatientTag,
    titalDict_deleteTitalDict} = api;


export default {
    namespace: 'itemSetting',

    state: {
        itemList:[],
        tagList:[]
    },

    effects: {
        *titalDict_deleteTitalDict({ payload,callback}, { call, put }) {
            let form=new FormData()
            form.append('id',payload.id)
            let res=yield call(titalDict_deleteTitalDict,form)
            callback(res)
        },
        *tagDict_getPatientTag({ payload,callback}, { call, put }) {
            let form = new FormData()
            form.append('hospCode',sessionStorage.getItem('hospCode'))
            let res=yield call(tagDict_getPatientTag,form)
            yield put({
                type:'tagDict_getPatientTagR',
                payload:res.result
            })
            callback(res)
        },
        *titalDict_updateTitalDict({ payload,callback}, { call, put }) {
            let res=yield call(titalDict_updateTitalDict,payload)
            callback(res)
        },
        *titalDict_saveTitalDict({ payload,callback}, { call, put }) {
            let res=yield call(titalDict_saveTitalDict,payload)
            callback(res)
        },
        *tagDict_getRegistrationTag({ payload,callback}, { call, put }) {
            let res=yield call(tagDict_getRegistrationTag,payload)
            yield put({
                type:'tagDict_getRegistrationTagR',
                payload:res.result
            })
            callback(res)
        },
       

    },

    reducers: {
        tagDict_getPatientTagR(state,action){
            return {
                ...state,
                tagList:action.payload
            }
        },
        tagDict_getRegistrationTagR(state,action){
            return {
                ...state,
                itemList:action.payload
            }
        },
        
    },

    subscriptions :{
    },
};
