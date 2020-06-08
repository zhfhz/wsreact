import React from "react";
import { connect } from 'dva';
import intl from 'react-intl-universal';
import Transition from "@components/Transition";
import { DatePicker, Space, Button, Row, Col } from 'antd';
import { Line } from '@ant-design/charts';
import styles from './style.less';
import Base from './base';

export default
@connect(
    ({ pingUseRate }) => ({
        ...pingUseRate,
    }),
    dispatch => ({
        getViewData: payload => dispatch({
            type: 'pingUseRate/getViewData',
            payload
        })
    })
)
class View extends Base {
    render() {
        const { viewData, ...rest } = this.props;
        const { startDate, endDate, useAnimate } = this.state;
        const jsonObject = viewData && viewData['jsonObject'] || {};
        const days = jsonObject['allPings'] && jsonObject['allPings']['time'] || [];
        const values = jsonObject['allPings'] && jsonObject['allPings']['metricValue'] || [];
        const data = days.map((item, index) => ({
            day: item,
            value: values[index]
        }));
        const lineConfig = {
            data,
            title: {
                visible: false,
                text: '',
            },
            meta: {
                time: {
                    alias:intl.get('date'),
                    range: [0, 1],
                },
                value: {
                    alias: intl.get('ping_use_rate'),
                    formatter:(v)=>{return `${v} %`}
                }
            },
            xField: 'day',
            yField: 'value',
            yAxis: {
                grid: {
                    visible: true,
                    line: {
                        style: {
                            lineDash: [4],
                            lineWidth: 1
                        }
                    }
                }
            },
            xAxis: {
                grid: {
                    visible: true,
                    line: {
                        style: {
                            lineDash: [4],
                            lineWidth: 1
                        }
                    }
                }
            },
            renderer: "svg"
        };
        return (
            <div className={styles.pingUseRate}>
                <Row gutter={24}>
                    <Transition
                        useAnimate={useAnimate}
                        name="move-down"
                    >
                        <Col span={24}>
                            <section>
                                <Space size="middle">
                                    <span>
                                        {intl.get('start_date')}
                                        &nbsp;
                                        <DatePicker
                                            value={startDate}
                                            format={this.dateFormat}
                                            allowClear={false}
                                            disabledDate={this.handleDisableDate}
                                            onChange={this.handleStartDatePickerChange}
                                            inputReadOnly
                                            showToday={false}
                                        />
                                    </span>
                                    <span>
                                        {intl.get('end_date')}
                                        &nbsp;
                                        <DatePicker
                                            value={endDate}
                                            format={this.dateFormat}
                                            allowClear={false}
                                            disabledDate={this.handleDisableDate}
                                            onChange={this.handleEndDatePickerChange}
                                            inputReadOnly
                                        />
                                    </span>
                                    <Button
                                        type="primary"
                                        onClick={this.query}
                                    >
                                        {intl.get('do_query')}
                                    </Button>
                                </Space>
                            </section>
                        </Col>
                    </Transition>
                    <Transition
                        useAnimate={useAnimate}
                        name="move-right"
                    >
                        <Col xl={{ span: 5 }} xs={{ span: 24 }}>
                            <section style={{height: 500}}>
                                <h3>{intl.get('ping_use_overview')}</h3>
                                <article>
                                    <h4>{intl.get('ping_num_total')}</h4>
                                    <span>
                                        {jsonObject['allPingCounts']} <span>{intl.get('ping_num_unit')}</span>
                                    </span>
                                </article>
                                <article>
                                    <h4>{intl.get('ping_use_times_total')}</h4>
                                    <span>
                                        {jsonObject['allcz']} <span>{intl.get('ping_use_times_unit')}</span>
                                    </span>
                                </article>
                                <article>
                                    <h4>{intl.get('ping_avg_use_times_total')}</h4>
                                    <span>
                                        {jsonObject['allczByAvgT']} <span>{intl.get('ping_use_times_unit')}</span>
                                    </span>
                                </article>
                            </section>
                        </Col>
                    </Transition>
                    <Transition
                        useAnimate={useAnimate}
                        name="move-left"
                    >
                        <Col xl={{ span: 19 }} xs={{ span: 24 }}>
                            <section style={{height: 500}}>
                                <h3>{intl.get('ping_use_rate_line')}</h3>
                                <Line {...lineConfig} style={{ height:435, width: '100%' }} />
                            </section>
                        </Col>
                    </Transition>
                </Row>
            </div>
        );
    }
}
