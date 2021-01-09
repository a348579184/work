/**
 * 工具类
 */
import moment from 'moment';

export function refactor(data) {
  // 初始化返回数据
  let refactorData = null;
  // 判断入参是否是数组
  if (Object.prototype.toString.call(data) === '[object Array]') {
    // 改变返回数据格式
    refactorData = [];
    // 循环入参将数据进一步解析
    for (let i = 0; i < data.length; i++) {
      // 判断子元素是否是对象或数组 如果是对象或数组进行方法自调用处理数据
      if (typeof data[i] === 'object') {
        refactorData.push(refactor(data[i]));
      } else {
        refactorData.push(data[i]);
      }
    }
  }
  // 判断入参是否是数组
  else if (Object.prototype.toString.call(data) === '[object Object]') {
    // 改变返回数据格式
    refactorData = {};
    // 循环入参将数据进一步解析
    for (let i in data) {
      // 判断子元素是否是对象或数组 如果是对象或数组进行方法自调用处理数据
      if (typeof data[i] === 'object') {
        refactorData[i] = refactor(data[i]);
      } else {
        refactorData[i] = data[i];
      }
    }
  }
  // 判断入参是否是其他类型数据
  else {
    refactorData = data;
  }
  // 返回处理后的数据
  return refactorData;
}

//渲染操作列
export function handleRender(arr) {
  let tmp = refactor(arr);
  if (Object.prototype.toString.call(tmp) === '[object Array]') {
    tmp.map(item => {
      if (undefined !== item.render) {
        let render = JSON.parse(item.render);
        item.render = (text) => {
          switch (render[0].type) {
            case "link":
              return <a onClick={() => linkTo(text)}>查看</a>
          }
        };
      }
    })
    return tmp
  }
}

//弹出窗口
export function linkTo(url) {
  var iWidth = 1400; //弹出窗口的宽度;
  var iHeight = 800; //弹出窗口的高度;
  var iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
  var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
  window.open(url, '报卡审核', 'fullscreen=yes,width=' + iWidth + ',height=' + iHeight + ',top=' + iTop + ',left=' + iLeft + ', location=no, status=no');
}

//计算时间跨度length
export function StringToMoment(data) {
  let newData = [];
  data.map(item => {
    let timeData = [];
    let halfDay = item.halfDay;
    item.timeData.map(i => {
      const startTime = i.startTime;
      const endTime = i.endTime;
      const tmpStartTime = moment(startTime, 'HH:mm');
      const tmpEndTime = moment(endTime, 'HH:mm');
      const total = i.total;
      const length = (moment(tmpEndTime).valueOf() - moment(tmpStartTime).valueOf()) / 60000;//时间差毫秒转分钟
      let tmp = {
        startTime,
        endTime,
        total,
        length
      };
      timeData.push(tmp);
    });
    let newItem = {
      halfDay,
      timeData
    }
    newData.push(newItem);
  });
  return newData;
}


// 乘法
export const multiply = (a, b) => {
    if (undefined == a || undefined == b) {
        return 0
    }
    let m = 0,
        c = a.toString(),
        d = b.toString();
    try {
        m += c.split(".")[1].length
    } catch (e) {

    }
    try {
        m += d.split(".")[1].length
    } catch (e) {

    }
    return Number(c.replace(".", "")) * Number(d.replace(".", "")) / Math.pow(10, m)
}