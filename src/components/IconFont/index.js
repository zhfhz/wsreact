import React from "react";
import { createFromIconfontCN } from '@ant-design/icons';
import styles from './style.less';

const MyIcon = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_1465484_5gdfkkkr7yw.js',
        '//at.alicdn.com/t/font_720095_93c1qu2kdtd.js'
    ],
});

export default ({ fill, width, height, type, ...restProps }) => {
    const iconFont = (
        <MyIcon {...restProps} style={{width, height}} className={styles.myIcon}>
            <use xlinkHref={"#".concat(type)} fill={fill} />
        </MyIcon>
    );
    return iconFont;
};