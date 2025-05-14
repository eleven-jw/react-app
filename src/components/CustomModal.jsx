import { Modal, Button } from "antd";

const CustomModal = ({
  title = "Basic Modal",
  open,
  isFormValid,
  confirmLoading,
  handleOk = () => {},
  handleCancel = () => {},
  children,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={confirmLoading}
            onClick={handleOk}
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </div>
      }
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
