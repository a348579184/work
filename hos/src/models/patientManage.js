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
const { } = api;


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
        rDetail:{}
    },

    effects: {

       

    },

    reducers: {
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
