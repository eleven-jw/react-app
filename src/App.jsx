// App.jsx
import React, { useState, useRef } from "react";
import { Button, Divider, Tag, message, Tabs } from "antd";
import CustomTable from "./components/CustomTable";
import CustomModal from "./components/CustomModal";
import CustomForm from "./components/CustomForm";
import "./index.css";

const App = () => {
  // Sample data for the table
  const dataSource = [
    {
      id: "1",
      description: "Mission1",
      state: "0", // in progress
      time: "2023-10-01 12:00:00",
    },
    {
      id: "2",
      description: "Mission2",
      state: "1", // completed
      time: "2023-10-01 12:00:00",
    },
  ];

  // Define the columns for the table
  const columns = [
    { title: "NO", dataIndex: "id", key: "id" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (text) => {
        const color = text === "0" ? "green" : "red";
        return (
          <Tag color={color}>{text === "0" ? "In Progress" : "Completed"}</Tag>
        );
      },
    },
    { title: "Time", dataIndex: "time", key: "time" },
    { title: "Action", dataIndex: "action", key: "action" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(1);
  const onChange = (index) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
    console.log("Selected index:", index);
    const filteredData = dataSource.filter((item) => {
      if (index === 1) return true; // All
      if (index === 2) return item.state === "0"; // In Progress
      if (index === 3) return item.state === "1"; // Completed
      return false;
    });
    setTasks(filteredData);
  };

  const [open, setOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [tasks, setTasks] = useState(dataSource);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const formRef = useRef();

  const handleAdd = () => {
    formRef.current?.resetFields();
    setOpen(true);
  };

  const handleModalOK = async () => {
    formRef.current.submit();
    try {
      const values = await formRef.current.validateFields();
      console.log("values", values);
      setOpen(false);
      setConfirmLoading(true);
      // mock async operation
      setTimeout(() => {
        setTasks([
          ...tasks,
          {
            id: (tasks.length + 1).toString(),
            description: values.description,
            state: "0",
            time: values.completeTime.format("YYYY-MM-DD HH:mm:ss"),
          },
        ]);
        setConfirmLoading(false);
        message.success("Added successfully!");
      }, 1000);
    } catch (error) {
      console.log("Validation failed:", error);
      setConfirmLoading(false);
      message.success("Added failed!");
    }
  };

  const handleModalCancel = () => {
    setOpen(false);
    formRef.current?.resetFields();
  };

  const onDeleteConform = (record) => {
    console.log("Delete", record);
    const newData = tasks.filter((item) => item.id !== record.id);
    setTasks(newData);
    message.success("Deleted successfully!");
  };
  const onCompleteConform = (record) => {
    console.log("Complete", record);
    const newData = tasks.map((item) => {
      if (item.id === record.id) {
        return { ...item, state: "1" };
      }
      return item;
    });
    setTasks(newData);
    console.log("newData", newData);
    message.success("Completed successfully!");
  };

  return (
    <div className="task-box">
      <div className="header">
        <h1>TASK OA MANAGEMENT SYSTEM</h1>
        <Button type="primary" onClick={handleAdd}>
          Add Mission
        </Button>
      </div>
      <Divider />
      <div className="task-tag">
        {["All", "In Progress", "Completed"].map((item, index) => (
          <Tag
            key={index}
            color={
              item === "All" ? "green" : item === "In Progress" ? "blue" : "red"
            }
            onClick={() => onChange(index + 1)}
            style={{ cursor: "pointer", margin: "0 8px" }}
          >
            {item}
          </Tag>
        ))}
      </div>
      <CustomTable
        dataSource={tasks}
        columns={columns}
        onCompleteConform={onCompleteConform}
        onDeleteConform={onDeleteConform}
      />
      <CustomModal
        title="Add Mission"
        open={open}
        isFormValid={isFormValid}
        confirmLoading={confirmLoading}
        handleOk={handleModalOK}
        handleCancel={handleModalCancel}
      >
        <CustomForm
          ref={formRef}
          onFinish={() => {}}
          onFinishFailed={() => {}}
        />
      </CustomModal>
    </div>
  );
};

export default App;
