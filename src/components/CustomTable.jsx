import React from 'react';
import { Table, Space, Popconfirm, Button} from 'antd';

const CustomTable = ({
  dataSource = [],
  columns = [],
  rowKey = 'id',
  onDeleteConform = () => {},
  onDeleteCancel = () => {},
  onCompleteConform = () => {},
  onCompleteCancel = () => {},
}) => {

  const enhancedColumns = columns.map((col) => {
    if (col.dataIndex === 'action') {
      return {
        ...col,
        render: (_, record) => (
            <Space>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => onDeleteConform(record)}
                    onCancel={onDeleteCancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="link">Delete</Button>
                </Popconfirm>
                {
                    +record.state !== 0 ? <Popconfirm
                    title="Delete the task"
                    description="Are you sure to compelete this task?"
                    onConfirm={(ß) => onCompleteConform(record)}
                    onCancel={onCompleteCancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="link">Compelete</Button>
                </Popconfirm> : null
                }
                
            </Space>
        ),
      };
    }

    return col;
  });

  return (
    <Table
        rowKey={rowKey}
        dataSource={dataSource}
        columns={enhancedColumns}
        pagination={false}
        size="small"
    />
  );
};

export default CustomTable;