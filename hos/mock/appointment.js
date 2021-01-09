import mockjs from 'mockjs';
import {
    delay,
} from 'roadhog-api-doc';

const mock = {
    'GET /api/emr/treat/medicalAppointments/adjustment/queryAppointmentList': mockjs.mock({
        data: [
            {
                num: 1,
                name: '王小帅',
                type: '住院',
            },
            {
                num: 2,
                name: '王小丑',
                type: '住院',
            },
            {
                num: 3,
                name: '王小美',
                type: '住院',
            },
            {
                num: 4,
                name: '王小笨',
                type: '住院',
            },
            {
                num: 5,
                name: '王小傻',
                type: '住院',
            },
            {
                num: 6,
                name: '王小呆',
                type: '住院',
            },
            {
                num: 7,
                name: '王小憨',
                type: '住院',
            },
            {
                num: 8,
                name: '王小高',
                type: '住院',
            },
            {
                num: 9,
                name: '王小胖',
                type: '住院',
            },
            {
                num: 10,
                name: '王小瘦',
                type: '住院',
            },
            {
                num: 11,
                name: '王小矮',
                type: '住院',
            },
            {
                num: 12,
                name: '王小俊',
                type: '住院',
            },
        ],
    }),
    'GET /api/emr/treat/treatTimeConfig/getResNum': mockjs.mock({
        resNumData: {
            'am|3': [{
                amPmFlag: '上午',//上下午标识
                'completeNum|0-30': 30, //已预约人数
                createDatetime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',//创建时间
                creater: '@cname',//创建人
                'createrCode|100-200': 100,//创建人代码
                'deptCode|10000-20000': 10000,//科室代码
                'deptName|1': ['康复科', '治疗科', '急诊科'],//科室名称
                endTime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',//结束时间
                execDate: '2020年4月6日',//日期
                'extendNum|1-10': 1,//拓展号数
                'maxNum|30-50': 30,//上限人数
                'ordinaryNum|20-30': 20,//普通号数
                'remainderNum|10-20': 10,//剩余号数
                'sortNo|1-6': 1,//排序
                startTime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',//开始时间
                'timeName|1': ['111', '222', '333'],//时段名称
                'timeStageNo|1-6': 1,//时段序号
                'validStatus|0-1': 0,//有效标志
                'week|1-7': 1,//周
            }],
            'pm|3': [{
                amPmFlag: '下午',//上下午标识
                'completeNum|0-30': 30, //已预约人数
                createDatetime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',//创建时间
                creater: '@cname',//创建人
                'createrCode|100-200': 100,//创建人代码
                'deptCode|10000-20000': 10000,//科室代码
                'deptName|1': ['康复科', '治疗科', '急诊科'],//科室名称
                endTime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',//结束时间
                execDate: '2020年4月6日',//日期
                'extendNum|1-10': 1,//拓展号数
                'maxNum|30-50': 30,//上限人数
                'ordinaryNum|20-30': 20,//普通号数
                'remainderNum|10-20': 10,//剩余号数
                'sortNo｜1-6': 1,//排序
                startTime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',//开始时间
                'timeName|1': ['111', '222', '333'],//时段名称
                'timeStageNo|1-6': 1,//时段序号
                'validStatus|0-1': 0,//有效标志
                'week|1-7': 1,//周
            }],
        },
    }),
    'GET /api/emr/treat/treatTimeConfig/updateResNum': mockjs.mock({
        status: 'success',
        code: 200,
        msg: '修改成功',
    }),
};

//模拟网络延时 单位ms
export default delay(mock, 200);
