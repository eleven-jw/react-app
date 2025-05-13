import { Modal } from "antd";

const CustomModal = ({
    title = "Basic Modal",
    open,
    handleOk = () => {},
    handleCancel = () => {},
    children,
}) => {
  return (
    <Modal title={title} open={open} onOk={handleOk} onCancel={handleCancel}>
      {children}
    </Modal>
  );
};

export default CustomModal;
