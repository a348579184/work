import router from 'umi/router';
import md5 from 'md5'
import api from '@/services/today';
import { platformKey, isSuccess, platformToken } from '../utils/constant';
import { userInfo } from 'os';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
const { patientMaster_getpatientId} = api;


export default {
    namespace: 'today',

    state: {
        pid:'',
        tagList:[]
    },

    effects: {
        *patientMaster_getpatientId({ payload,callback}, { call, put }){
            let res=yield call(patientMaster_getpatientId)
            if(res.success){
                yield put({
                    type:'patientMaster_getpatientIdrR',
                    payload:res.result
                })
            }
            callback(res)
        },
       

    },

    reducers: {
        patientMaster_getpatientIdrR(state,action){
            return {
                ...state,
                pid:action.payload
            }
        },
        tagListSave(state,action){
            return {
                ...state,
                tagList:action.payload
            }
        },
        
    },

    subscriptions :{
    },
};
