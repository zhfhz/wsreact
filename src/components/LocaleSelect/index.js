import React from 'react';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

const { Option } = Select;
export default ({ locales = [], defaultValue, onChange }) => {
  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: 120 }}
      onChange={onChange}
    >
      {locales.map((locale) => (
        <Option key={locale.value} value={locale.value}>
          <GlobalOutlined /> &nbsp;{locale.name}
        </Option>
      ))}
    </Select>
  );
};
