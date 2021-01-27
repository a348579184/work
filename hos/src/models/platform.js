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
const { platform_login, platform_departName ,platform_userinfo,staffVsGroup_getMenuAuth,treat_secretLogin} = api;


export default {
    namespace: 'platform',

    state: {
        department: [],
        msg: "",
        userinfo:null,   //用户信息
        departValue:{
            departmentName:"",
            departmentCode:"",
        }

    },

    effects: {
        
        *platformLogOut({ payload }, { call, put }) {
            sessionStorage.removeItem(platformToken);
            router.push('/login');
        },
        *platformLogin({ payload }, { call, put }) {
            sessionStorage.setItem(platformToken, 'abcd');
            router.push('MedicalFee/ConfirmFee');
            
        },
        *platformDepart({ payload }, { call, put }) {
            // const { account } = payload;
            // let formData = new FormData()
            // formData.append("account", account)
            const response = yield call(platform_departName, payload);

            if (response.code == 200) {
                sessionStorage.setItem("depart", JSON.stringify(response.data));
                yield put({
                    type: 'saveDepart',
                    payload: response.data,
                });
            }
        },
        // 根据account获取用户信息
        *getPlatformUserinfo({ payload }, { call, put }) {
            const response = yield call(platform_userinfo, payload);
            sessionStorage.setItem("userinfo", JSON.stringify(response.data[0]));
            if (response.code === 200) {
                yield put({
                    type: 'platformUserinfo',
                    payload: response.data,
                });
            }
        },

    },

    reducers: {
        loginMsg(state, action) {
            return {
                ...state,
                msg: action.payload,
            };
        },
        saveDepart(state, action) {
            return {
                ...state,
                department: action.payload,
                departValue:{
                    departmentName:action.payload.length==0?"":action.payload[0].deptName,
                    departmentCode:action.payload.length==0?"":action.payload[0].deptCode,
                }
            };
        },
        platformUserinfo(state, action) {
            return {
                ...state,
                userinfo: action.payload[0],
            };
        },
        clearData(state,action) {
            return {
                ...state,
                department: [],
                msg: "",
                userinfo:null,   //用户信息
                departValue:{
                    departmentName:"",
                    departmentCode:"",
                }
            }
        }
    },

    subscriptions :{
        setup({dispatch,history }){
            history.listen(({ pathname }) => {
                const match = pathToRegexp('/login').exec(pathname)
                if (match) {
                    dispatch({ type: 'clearData' })
                }
            });
        }
    },
};
