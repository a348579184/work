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
    priceDict_getPriceDictByClassId,classDict_getClassDict,classDict_saveOrUpdateClassDict,
    classDict_deleteClassDictById,priceDict_saveOrUpdatePriceDict,priceDict_deletePriceDictById
} = api;


export default {
    namespace: 'feeItem',

    state: {
        feeItemList:[],dictList:[],diagnosis:[],medicines:[]

    },

    effects: {
        *priceDict_saveOrUpdatePriceDict({ payload,callback}, { call, put }) {
            let res=yield call(priceDict_saveOrUpdatePriceDict,payload)
            callback(res)
        },
        *priceDict_deletePriceDictById({ payload,callback}, { call, put }) {
            let form=new FormData()
            form.append('id',payload.id)
            let res=yield call(priceDict_deletePriceDictById,form)
            callback(res)
        },
        *classDict_deleteClassDictById({ payload,callback}, { call, put }) {
            let form=new FormData()
            form.append('id',payload.id)
            let res=yield call(classDict_deleteClassDictById,form)
            callback(res)
        },
        *classDict_saveOrUpdateClassDict({ payload,callback}, { call, put }) {
            let res=yield call(classDict_saveOrUpdateClassDict,payload)
            callback(res)
        },
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
            let form=new FormData()
            form.append('hospCode',payload.hospCode)
            form.append('classId',payload.classId)
            form.append('input',payload.input)
            let res=yield call(priceDict_getPriceDictByClassId,form)
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
        clearData(state,action){
            return{
                feeItemList:[],dictList:[],diagnosis:[],medicines:[]
            }
        }
        
    },

    subscriptions :{
        setup({dispatch,history }){
            history.listen(({ pathname }) => {
                const match = pathToRegexp('/BasicSettings/FeeItem').exec(pathname)
                if (!match) {
                    dispatch({ type: 'clearData' })
                }
            });
        }
    },
};
