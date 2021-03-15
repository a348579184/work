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
import api from '@/services/patientManage';
import { platformKey, isSuccess, platformToken } from '../utils/constant';
import { userInfo } from 'os';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
const { costDetails_getCostDetailsList} = api;


export default {
    namespace: 'patient',

    state: {
        show:{
            show:false,
            detail:{}
        },
        visitList:[],
        mvisible:false,
        fvisible:false,
        rDetail:{},
        feeList:[],
        allFeeList:[],
        feeDetail:{}
    },

    effects: {
        *costDetails_getCostDetailsList({ payload,callback}, { call, put }) {
            let form=new FormData()
            form.append('hospCode',payload.hospCode)
            form.append('patientId',payload.patientId)
            let res=yield call(costDetails_getCostDetailsList,form)
            if(res.success){
                yield put({
                    type:'costDetails_getCostDetailsListR',
                    payload:res.result
                })
            }
            callback(res)
        },
       

    },

    reducers: {
        feeDetailSet(state,action){
            return {
                ...state,
                feeDetail:action.payload
            }
        },
        costDetails_getCostDetailsListR(state,action){
            let arr=action.payload
            let feeList=[]
            arr.map(val=>feeList.push(val.payDemandNote))
            return {
                ...state,
                feeList,
                allFeeList:arr
            }
        },
        visitListSet(state,action){
            return {
                ...state,
                visitList:action.payload
            }
        },
        showChange(state,action){
            return {
                ...state,
                show:action.payload
            }
        },
        mvisibleChange(state,action){
            return {
                ...state,
                mvisible:action.payload
            }
        },
        fvisibleChange(state,action){
            return {
                ...state,
                fvisible:action.payload
            }
        },
        rDetailSet(state,action){
            return {
                ...state,
                rDetail:action.payload
            }
        },
        
    },

    subscriptions :{
    },
};
