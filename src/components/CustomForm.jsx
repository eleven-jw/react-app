import { forwardRef, useImperativeHandle } from "react";
import { DatePicker, Form, Input } from "antd";

const CustomForm = forwardRef((props, ref) => {
  const { TextArea } = Input;
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.submit();
    },
    resetFields: () => {
      form.resetFields();
    },
    validateFields: () => {
      return form.validateFields(); // Ensure validateFields is exposed
    },
  }));
  const handleFinish = (values) => {
    props.onFinish(values);
  };
  const handleFinishFailed = (errorInfo) => {
    props.onFinishFailed(errorInfo);
  };
  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Description"
        name="description"
        hasFeedback
        rules={[
          { required: true, message: "Please input mission description" },
        ]}
      >
        <TextArea row={4} />
      </Form.Item>

      <Form.Item
        label="Expected Complete Time"
        name="completeTime"
        rules={[
          {
            required: true,
            message: "Please choose expected complete time!",
          },
          {
            validator: (_, value) => {
              if (value && value.isBefore(new Date())) {
                return Promise.reject("Date must be in the future!");
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
    </Form>
  );
});
export default CustomForm;
