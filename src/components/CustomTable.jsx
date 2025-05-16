import React from "react";
import { Table } from "antd";

const CustomTable = ({
  dataSource = [],
  columns = [],
  rowKey = "id",
  // onDeleteConform = () => {},
  // onDeleteCancel = () => {},
  // onCompleteConform = () => {},
  // onCompleteCancel = () => {},
}) => {
  return (
    <Table
      rowKey={rowKey}
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      size="small"
    />
  );
};

export default CustomTable;
