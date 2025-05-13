import React, { useState, useEffect } from 'react';
import CustomTable from './components/CustomTable';
import CustomModal from './components/CustomModal';
import CustomForm from './components/CustomForm';
import { Button, Divider, Tag, DatePicker, Form, Input} from 'antd';
import './index.css'


const App = () => {
    const [open, setOpen] = useState(false);
    const handleAdd = () => {
        console.log('Add');
        setOpen(true)
    }
    // 监听 open 变化
    useEffect(() => {
        console.log('Open changed:', open);
    }, [open]);
    const handleModalCancel = () => {
        console.log('cancel');
        setOpen(false)
    }
    const handleModelOK = () => {
        console.log('OK');
        setOpen(false)
    }
    const dataSource = [
        {
          id: '1',
          description: 'Misson1',
          state: '0',
          time: '2023-10-01 12:00:00',
        },
        {
            id: '2',
            description: 'Misson2',
            state: '1',
            time: '2023-10-01 12:00:00',
        },
      ];
      const columns = [
        {
          title: 'NO',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          ellipsis: true,
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            render: (text) => {
                let color = text === '0' ? 'green' : 'red';
                return <Tag color={color}>{text === '0' ? 'In Progress' : 'Completed'}</Tag>;
            },
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
        },
      ];
        const onDeleteConform = (record) => {
            console.log('Delete', record);
        }
        const onDeleteCancel = () => {}
        const onCompleteConform = (record) => {
            console.log('Complete', record);
        }
        const onCompleteCancel = () => {}

        const onFormFinish = () => {

        }
        const onFormFinishFailed = () => {

        }

    return (
        <div className="task-box">
            <div className="header">
                <h1>TASK OA MAGETEMENT SYSTEM</h1>
                <Button type="primary" onClick={handleAdd}>Add Mission</Button>
            </div>
            
            <Divider />
            <div className="task-tag">
                <Tag color="green">All</Tag>
                <Tag color="blue">In Progress</Tag>
                <Tag color="red">Completed</Tag>
            </div>
            <CustomTable dataSource={dataSource} columns={columns} onCompleteConform={onCompleteConform} onDeleteConform={onDeleteConform}/>;
            <CustomModal title="Add Misson" open={open} handleOk={handleModelOK} handleCancel={handleModalCancel}>
                <CustomForm
                    onFinish={onFormFinish}
                    onFinishFailed={onFormFinishFailed}
                >
                </CustomForm>
            </CustomModal>
        </div>
    );
};

export default App;