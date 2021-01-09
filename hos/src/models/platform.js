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
        //山东单点登录
        *platformToken({payload,callback},{call,put}){
            let formData = new FormData()
            const {account,secret,parameterName} = payload
            formData.append("account", account)
            formData.append("secret", secret)
            formData.append("parameterName", parameterName)
            let response=yield call(treat_secretLogin,formData)
            if(response.code==200&&response.data.flag){
                const {deptCode,deptName}=response.data
                const depart = yield call(platform_departName, {account});
                sessionStorage.setItem("depart", JSON.stringify(depart.data));
                var user = { user: account, deptCode,deptName};
                sessionStorage.setItem(platformToken, 'abcd');
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("deptCode", deptCode);
                yield put({
                    type: 'loginMsg',
                    payload: null,
                });
                const userinfo = yield call(platform_userinfo, payload);

                sessionStorage.setItem("userinfo", JSON.stringify(userinfo.data[0]));
                if (userinfo.code === 200) {
                  yield put({
                    type: 'platformUserinfo',
                    payload: userinfo.data,
                  });
                }
                
                callback(payload)

            }else{
                message.error(response.message)
            }

        },
        //获得权限
        *staffVsGroup_getMenuAuth({payload},{call,put}){
            let data=new FormData()
                data.append('account',payload.account)
                data.append('deptCode',payload.deptCode)
            let response = yield call(staffVsGroup_getMenuAuth,data)
            if(response.code==200&&response.data.length>0){
                sessionStorage.setItem('auth',JSON.stringify(response.data[0].auth))
            }else{
                sessionStorage.setItem('auth',JSON.stringify([]))
            }
        },
        //独立页面（确费管理）的登录
        *myLogin({payload,callback},{call,put}){
            const {account,password,deptCode,deptName} = payload
            let formData = new FormData()
            formData.append("account", account)
            formData.append("password", password)
                var user = { user: account, deptCode,deptName};
                sessionStorage.setItem(platformToken, md5(platformKey + account + password));
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("deptCode", deptCode);
                yield put({
                    type: 'loginMsg',
                    payload: null,
                });
            const response = yield call(platform_userinfo, payload);

            sessionStorage.setItem("userinfo", JSON.stringify(response.data[0]));
            if (response.code === 200) {
                yield put({
                    type: 'platformUserinfo',
                    payload: response.data,
                });
            }
                
                callback(payload)
        },
        *platformLogOut({ payload }, { call, put }) {
            sessionStorage.removeItem(platformToken);
            router.push('/login');
        },
        *platformLogin({ payload }, { call, put }) {
            const { account, password, partment,deptName} = payload;
            let formData = new FormData()
            formData.append("account", account)
            formData.append("password", password)
            const response = yield call(platform_login, formData);
            if (response.code == 200) {

                // yield put({
                //     type:'staffVsGroup_getMenuAuth',
                //     payload:{
                //         deptCode:partment,
                //         account
                //     }
                // })
                const userinfo=JSON.parse(sessionStorage.getItem('userinfo'))
                let user = { user: userinfo.empNo||account, deptCode: partment,deptName};
                sessionStorage.setItem(platformToken, 'abcd');
                sessionStorage.setItem("user", JSON.stringify(user));
                sessionStorage.setItem("deptCode", partment);
                yield put({
                    type: 'loginMsg',
                    payload: null,
                });
              router.push('MedicalFee/ConfirmFee');
            } else {
                message.error(response.message)
                yield put({
                    type: 'loginMsg',
                    payload: response.msg,
                });
            }
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
