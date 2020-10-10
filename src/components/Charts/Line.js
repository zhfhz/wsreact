import React from 'react';
import PropTypes from 'prop-types';
import 'd3-transition';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear } from 'd3-scale';

class Line extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      timestamp: 0,
    };
  }

  componentDidMount() {
    this.setState({
      timestamp: Date.now(),
    });
    window.addEventListener('resize', this.resize, false);
  }

  resize = () => {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = window.setTimeout(() => {
      this.setState({
        timestamp: Date.now(),
      });
      this.timer = null;
    }, 800);
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize, false);
  }

  renderChartScale = (svg) => {
    const {
      padding: { top, left, right, bottom },
    } = this.props;
    const xAixs = svg
      .selectAll('.x-axis')
      .data([null])
      .join('g')
      .classed('x-axis', true);
    xAixs
      .transition()
      .duration(200)
      .attr('transform', `translate(0,${this.wrapper.clientHeight - bottom})`);
    const yAxis = svg
      .selectAll('.y-axis')
      .data([null])
      .join('g')
      .classed('y-axis', true);
    yAxis
      .transition()
      .duration(200)
      .attr('transform', `translate(${left},${top})`);
    yAxis.empty();
    xAixs.empty();
    axisBottom(
      scaleLinear()
        .domain([0, this.wrapper.clientWidth - right])
        .range([left, this.wrapper.clientWidth - left - right])
    )(xAixs);
    axisLeft(
      scaleLinear()
        .domain([100, 0])
        .range([top, this.wrapper.clientHeight - top - bottom])
    )(yAxis);
  };

  renderChartLine = (svg) => {
    const {
      padding: { top, left, right, bottom },
    } = this.props;
    const series = svg
      .selectAll('.series')
      .data([null])
      .join('g')
      .classed('series', true);
  };

  renderChart = () => {
    const wrapper = select(this.wrapper);

    const svg = wrapper.selectAll('svg').data([null]).join('svg');
    svg
      .transition()
      .duration(200)
      .attr('viewBox', [
        0,
        0,
        this.wrapper.clientWidth,
        this.wrapper.clientHeight,
      ]);
    this.renderChartScale(svg);
    this.renderChartLine(svg);
  };

  lineWrapperDom = (wrapper) => (this.wrapper = wrapper);
  render() {
    const { width, height } = this.props;
    const { timestamp } = this.state;
    return (
      <div
        ref={this.lineWrapperDom}
        style={{ width: width || 'auto', height: height }}
      >
        {timestamp > 0 && this.renderChart()}
      </div>
    );
  }
}

Line.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number.isRequired,
  padding: PropTypes.objectOf({
    top: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
  }),
};
Line.defaultProps = {
  padding: {
    top: 20,
    left: 40,
    right: 10,
    bottom: 20,
  },
};

export default Line;
