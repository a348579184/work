import router from 'umi/router';
import md5 from 'md5'
import api from '@/services/today';
import { platformKey, isSuccess, platformToken } from '../utils/constant';
import { userInfo } from 'os';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
const { patientMaster_getpatientId,patientMaster_savePatientMaster,
    registrationMaster_getRegistrationMaster,patientMaster_getPatientMasterByDto,
    registrationMaster_saveRegistrationMaster,registrationMaster_getHeadline
} = api;


export default {
    namespace: 'today',

    state: {
        pid:'',
        tagList:[],
        registerList:[],
        patientList:[],
        titleObj:{
            "patient":0,
            "registration": 0

        },
    },

    effects: {
        *registrationMaster_getHeadline({ payload,callback}, { call, put }){
            let res=yield call(registrationMaster_getHeadline,payload)
            if(res.success){
                yield put({type:'registrationMaster_getHeadlineR',payload:res.result})
            }
            callback(res)
        },
        *registrationMaster_saveRegistrationMaster({ payload,callback}, { call, put }){
            let res=yield call(registrationMaster_saveRegistrationMaster,payload)
            if(res.success){
                
            }
            callback(res)
        },
        *patientMaster_getPatientMasterByDto({ payload,callback}, { call, put }){
            let res=yield call(patientMaster_getPatientMasterByDto,payload)
            if(res.success){
                yield put({
                    type:'patientMaster_getPatientMasterByDtoR',
                    payload:res.result
                })
            }
            callback(res)
        },
        *registrationMaster_getRegistrationMaster({ payload,callback}, { call, put }){
            let res=yield call(registrationMaster_getRegistrationMaster,payload)
            if(res.success){
                yield put({
                    type:'registrationMaster_getRegistrationMasterR',
                    payload:res.result
                })
            }
            callback(res)
        },
        *patientMaster_savePatientMaster({ payload,callback}, { call, put }){
            let res=yield call(patientMaster_savePatientMaster,payload)
            callback(res)
        },
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
        registrationMaster_getHeadlineR(state,action){
            return {
                ...state,
                titleObj:action.payload
            }
        },
        patientMaster_getPatientMasterByDtoR(state,action){
            return {
                ...state,
                patientList:action.payload
            }
        },
        registrationMaster_getRegistrationMasterR(state,action){
            return {
                ...state,
                registerList:action.payload
            }
        },
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
