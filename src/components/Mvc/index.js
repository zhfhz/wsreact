import React from 'react';
import { connect } from 'dva';

export const controller = (...items) => Ctrl => ({
    bind(View) {
        class WrapView extends Ctrl {
            constructor(...args) {
                super(...args);
                const view = new View(...args);
                // 复制View属性
                Object.keys(view).forEach(key => {
                   if (key === 'state') {
                       this.state = {
                           ...this.state,
                           ...view.state
                       }
                       return;
                   }
                   this[key] = view[key];
                });
            }
        }
        // 复制View方法
        Object.getOwnPropertyNames(View.prototype).forEach(key => {
            if (key !== 'constructor') {
                WrapView.prototype[key] = View.prototype[key];
            }
        })

        return items.reverse().reduce((view, d) => d(view), WrapView);
    }
});

export const viewer = View => View;

// model 直接用redux的connect
export const model = connect;
