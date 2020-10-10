import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts';
import { onWindowResize } from '@utils/event';

export default function ECharts(props) {
  const ref = useRef(null);
  const { width = 'auto', height, theme, option, opts } = props;
  useEffect(() => {
    const chart = echarts.init(ref.current, theme, opts);
    chart.setOption(option);
    return onWindowResize(() => chart.resize());
  }, [option]);
  return <div ref={ref} style={{ width, height }}></div>;
}
ECharts.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number.isRequired,
  options: PropTypes.object.isRequired,
};
ECharts.defaultProps = {};
