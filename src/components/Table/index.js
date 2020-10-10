import React, { useContext, useState } from 'react';
import { Table, Form, Input } from 'antd';
import { Resizable } from 'react-resizable';
import intl from 'react-intl-universal';
import styles from './style.less';

const EditableContext = React.createContext({});

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const EditableCell = (props) => {
  const {
    title,
    editable,
    children,
    dataIndex,
    record,
    rowIndex,
    command,
    render,
    rules,
    ...restProps
  } = props;
  const { form, editing, setEditing } = useContext(EditableContext);
  if (editable && editing) {
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  }
  let childNode = children;
  if (editable && !command) {
    if (editing) {
      if (render) {
        childNode = (
          <Form.Item style={{ margin: 0 }} name={dataIndex} rules={rules}>
            {render(record[dataIndex], record, rowIndex, {
              form,
              editing,
              setEditing,
            })}
          </Form.Item>
        );
      } else {
        childNode = (
          <Form.Item style={{ margin: 0 }} name={dataIndex} rules={rules}>
            <Input />
          </Form.Item>
        );
      }
    } else {
      childNode = <span title={title}>{children}</span>;
    }
  } else if (command) {
    childNode = render(record[dataIndex], record, rowIndex, {
      form,
      editing,
      setEditing,
    });
  } else {
    childNode = <span title={title}>{children}</span>;
  }
  return <td {...restProps}>{childNode}</td>;
};
const EditableRow = (props, index) => {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={{ form, editing, setEditing }}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

class WrapperTable extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.dataSource !== prevState.propsDataSource) {
      return {
        dataSource: nextProps.dataSource,
        propsDataSource: nextProps.dataSource,
      };
    }
    return null;
  }

  state = {};

  initColumns = () => {
    const { columns, resizable } = this.props;
    let editable = columns.some((col) => col.editable);
    let newColumns = columns;
    if (editable) {
      newColumns = newColumns.map((col) => {
        const { render, ...rest } = col;
        return {
          ...rest,
          render: !col.command && !col.editable ? render : null,
          onCell: (record, rowIndex) => {
            return {
              record,
              rowIndex,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.tooltip ? record[col.dataIndex] : '',
              rules: col.editable ? col.rules : null,
              command: editable ? col.command : false,
              render: col.command || col.editable ? render : null,
            };
          },
        };
      });
      this.components = {
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
      };
    }
    if (resizable) {
      this.components = {
        header: {
          cell: ResizableTitle,
        },
        ...this.components,
      };
      const handleResize = (index) => (e, { size }) => {
        const { columns } = this.state;
        const nextColumns = [...columns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        this.setState({ columns: nextColumns });
      };
      newColumns = newColumns.map((col, index) => ({
        ...col,
        onHeaderCell: (column) => ({
          width: column.width,
          onResize: handleResize(index),
        }),
      }));
    }
    return newColumns;
  };

  render() {
    const { paginationConfig, ...restProps } = this.props;
    const { dataSource } = this.state;
    const columns = this.initColumns();
    return (
      <Table
        {...restProps}
        components={this.components}
        className={styles.table}
        columns={columns}
        dataSource={dataSource}
        bordered
        size="small"
        pagination={
          paginationConfig
            ? {
                className: styles.pagination,
                ...paginationConfig,
                showTotal: (total) =>
                  intl.get('PaginationTotal', { num: total }),
                itemRender: (current, type, originalElement) => {
                  if (type === 'prev') {
                    return <a>{intl.get('PaginationPrev')}</a>;
                  }
                  if (type === 'next') {
                    return <a>{intl.get('PaginationNext')}</a>;
                  }
                  return originalElement;
                },
              }
            : false
        }
      />
    );
  }
}

WrapperTable.Summary = Table.Summary;
export default WrapperTable;
