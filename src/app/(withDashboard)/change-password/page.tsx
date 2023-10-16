"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { authKey } from "@/constants/storageKey";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { removeUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const ResetPassPage = () => {
  const [changePassword] = useChangePasswordMutation();
  const router = useRouter();
  const onSubmit = async (values: any) => {
    message.loading({
      key: "changePassword",
      content: "Updating...",
    });
    try {
      const res = await changePassword(values);
      if (res) {
        message.success({
          key: "changePassword",
          content: "Successfully updated",
        });
        removeUserInfo(authKey);
        router.push("/login");
      }
    } catch (error: any) {
      message.error({
        key: "changePassword",
        content: error.message,
      });
    }
  };

  return (
    <div
      style={{ margin: "100px 0", display: "flex", justifyContent: "center" }}
    >
      <Form submitHandler={onSubmit}>
        <div
          style={{
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className="gutter-row"
              span={24}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="password"
                name="oldPassword"
                size="large"
                label="Old Password"
                placeholder="Enter your old password"
                required
              />
            </Col>
            <Col
              className="gutter-row"
              span={24}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="password"
                name="newPassword"
                size="large"
                label="New Password"
                placeholder="Enter your new password"
                required
              />
            </Col>
          </Row>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white max-w-xs font-semibold text-lg w-full text-center mx-auto py-1 rounded-md shadow-lg"
          >
            Update
          </button>
        </div>
      </Form>
    </div>
  );
};

export default ResetPassPage;
