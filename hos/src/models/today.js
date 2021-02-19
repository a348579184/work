import router from 'umi/router';
import md5 from 'md5'
import api from '@/services/today';
import { platformKey, isSuccess, platformToken } from '../utils/constant';
import { userInfo } from 'os';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
const { patientMaster_getpatientId,patientMaster_savePatientMaster,
    registrationMaster_getRegistrationMaster,patientMaster_getPatientMasterByDto,
    registrationMaster_saveRegistrationMaster,registrationMaster_getHeadline,
    registrationMaster_getRegistrationById,registrationMaster_updateRegistrationStatus
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
        rDetail:{
            addrCity: "",
            addrCounty: "",
            addrProvince: "",
            areaCode: "",
            clinicState: 1,
            clinicTag: "",
            clinicTagId: "",
            clinicType: 0,
            hospCode: "",
            id: null,
            identity: "",
            lastDate: "",
            name: "",
            operationDate: "",
            patientId: "",
            phone: "",
            registrationDate: "",
            remark: "",
            sex: '',
            tel: "",
            vipCode: '',
            visitId: '',
        }
    },

    effects: {
        *registrationMaster_updateRegistrationStatus({ payload,callback}, { call, put }){
            let res=yield call(registrationMaster_updateRegistrationStatus,payload)
            callback(res)
        },
        *registrationMaster_getRegistrationById({ payload,callback}, { call, put }){
            let res=yield call(registrationMaster_getRegistrationById,payload)
            if(res.success){
                yield put({
                    type:'registrationMaster_getRegistrationByIdR',
                    payload:res.result
                })
            }
            callback(res)
        },
        *registrationMaster_getHeadline({ payload,callback}, { call, put }){
            let form=new FormData()
            form.append('hospCode',sessionStorage.getItem('hospCode'))
            let res=yield call(registrationMaster_getHeadline,form)
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
            let form=new FormData()
            form.append('hospCode',payload.hospCode)
            let res=yield call(registrationMaster_getRegistrationMaster,form)
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
        registrationMaster_getRegistrationByIdR(state,action){
            return {
                ...state,
                rDetail:action.payload
            }
        },
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
