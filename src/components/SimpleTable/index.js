import React, { useEffect, useState } from 'react';
import intl from 'react-intl-universal';
import { Row, Col, Card, Form } from 'antd';
import Pagination from '@components/Pagination';
import WrapperTable from '@components/Table';
import { filterEmpty } from '@utils/obj';

const SimpleTable = ({
  commands,
  formItems,
  onParamsChange,
  params,
  paginationConfig,
  ...restProps
}) => {
  const handlePageNumChange = (current, pageSize) => {
    const { pageSize: prePageSize = 10 } = params;
    const newParams = {
      ...params,
      pageNum: +prePageSize !== pageSize ? 1 : current,
      pageSize,
    };
    onParamsChange({ ...newParams });
  };
  const handleQueryParamsChange = (values) => {
    const newParams = {
      ...params,
      ...values,
    };
    onParamsChange({
      ...newParams,
      pageNum: 1,
    });
  };
  return (
    <Row gutter={[20, 20]}>
      {formItems ? (
        <Col span={24}>
          <Card>
            <Form
              layout="inline"
              initialValues={filterEmpty({ ...params })}
              onFinish={handleQueryParamsChange}
            >
              {formItems}
            </Form>
          </Card>
        </Col>
      ) : null}
      <Col span={24}>
        <Card title={intl.get('Result')} extra={commands}>
          <WrapperTable {...restProps} />
        </Card>
      </Col>
      {paginationConfig ? (
        <Col span={24}>
          <Pagination {...paginationConfig} onChange={handlePageNumChange} />
        </Col>
      ) : null}
    </Row>
  );
};
export default SimpleTable;
