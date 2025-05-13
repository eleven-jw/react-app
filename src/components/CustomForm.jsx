
import { DatePicker, Form, Input} from 'antd';
const CustomForm = ({
    onFinish = () => {},
    onFinishFailed = () => {}
}) => {

    const { TextArea } = Input;
    return (
        <Form
            name="basic"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input mission description' }]}
            >
            <TextArea row={4} />
            </Form.Item>

            <Form.Item
                label="Expected Complete Time"
                name="completeTime"
                rules={[{ required: true, message: 'Please choose expected complete time!' }]}
            >
                <DatePicker />
            </Form.Item>
        </Form>
    )
}
export default CustomForm;