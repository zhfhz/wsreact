import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/bar';

export default function Bar(props) {
  const ref = useRef(null);
  const { width = 'auto', height, theme, option, opts } = props;
  useEffect(() => {
    echarts.init(ref.current, theme, opts).setOption(option);
    return () => {};
  }, [option]);
  return <div ref={ref} style={{ width, height }}></div>;
}
Line.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number.isRequired,
  options: PropTypes.object.isRequired,
};
Line.defaultProps = {};
