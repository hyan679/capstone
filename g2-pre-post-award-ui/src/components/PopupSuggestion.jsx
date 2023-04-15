import { Typography, Modal, Input, Form } from "antd";

export default function PopupComment({ visible, onCreate, onCancel }) {
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        visible={visible}
        title="Suggest Modification"
        okText="Submit"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item name="content" label="Suggestion">
            <Input type="textarea" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
