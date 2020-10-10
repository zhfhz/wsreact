import React from 'react';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { defaultLanguage } from '@locales';

const { Option } = Select;
export default ({ locales = [], onChange }) => {
  let currentLocale = intl.determineLocale({
    urlLocaleKey: 'lang',
    cookieLocaleKey: 'lang',
  });
  return (
    <Select
      defaultValue={currentLocale || defaultLanguage}
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
