/**
 * 事件防抖
 * 指定间隔内,触发多次执行一次
 */
export const debounce = (callback, duration = 1000) => {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = window.setTimeout(() => {
        callback(...args);
        timer = null;
      }, duration);
    }
  };
};
/**
 * 事件节流
 * 连续触发的事件，超出停顿时间后执行
 */
export const throttle = (callback, delay = 200) => {
  let timer = null;
  return function (...args) {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
const WINDOW_RESIZE_CALLBACKS = [];

/**
 * 全局注册的窗口变化监听器
 */
export const resizeHandle = throttle((e) =>
  WINDOW_RESIZE_CALLBACKS.forEach((callback) => callback(e))
);
window.removeEventListener('resize', resizeHandle, false);
window.addEventListener('resize', resizeHandle, false);
/**
 * 添加窗口改变事件监听到全局
 * @param callback
 * @returns {function(...[*]=)}
 */
export const onWindowResize = (callback) => {
  WINDOW_RESIZE_CALLBACKS.push(callback);
  // 返回删除监听的函数
  return () => {
    WINDOW_RESIZE_CALLBACKS.splice(
      WINDOW_RESIZE_CALLBACKS.indexOf(callback),
      1
    );
  };
};
