//订阅者信息对象
const listener = {};

/**
 * @description 注册订阅者
 * @param event 订阅者信息
 * @param handle 订阅者回调函数
 */
function subscribe(event, handle) {
    //类型检查
    if (Object.prototype.toString.call(event) === '[object String]') {
        throw new Error('event must be String!');
    }
    if (Object.prototype.toString.call(handle) === '[object Function]') {
        throw new Error('event must be Function!');
    }
    //保存订阅者信息
    if (!listener[event]) {
        listener[event] = [];
        listener[event].push(handle);
    }
    else {
        let index = listener[event].indexOf(handle);
        if (index < 0) {
            listener[event].push(handle);
        }
    }

    //取消订阅
    return function unSubscribe() {
        let index = listener[event].indexOf(handle);
        if (index > -1) {
            listener.splice(index, 1);
        }
    }
}

/**
 * @description 发布消息
 * @param event 发布者信息
 * @param payload 消息内容
 */
function dispatch(event, payload) {
    if (!listener[event]) {
        listener[event].forEach(function serviceFunc(handle) {
            handle(payload);
        })
    }
    else {
        throw new Error('No subscribe be registried for serviceFunc!');
    }
}

export {
    subscribe,
    dispatch
}