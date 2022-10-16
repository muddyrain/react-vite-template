import { useState } from "react";
import { Button } from "antd";
import { LOGO_DARK_PNG } from "@/assets";
import baseApi from "@/api/baseApi";
import styles from "./index.module.less";
import { Former } from "@/components";

const Fragment = () => {
  const [$form] = Former.useForm();
  const [processing, setProcessing] = useState(false);
  return (
    <section className={styles.container}>
      <div className={styles.former}>
        <img src={LOGO_DARK_PNG} className={styles.logo} />
        <Former
          form={$form}
          submitText={null}
          resetText={null}
          labelCol={4}
          wrapperCol={20}
          column={1}
          gutter={16}
          formProps={{ size: "large" }}
          datasource={[
            {
              label: "账号",
              key: "username",
              initialValue: "admin",
              required: true,
              view: "Input",
            },
            {
              label: "密码",
              key: "password",
              initialValue: "admin",
              required: true,
              view: "Password",
            },
          ]}
        />
        <Button
          type="primary"
          size="large"
          block
          loading={processing}
          onClick={() => {
            $form.validateFields().then((values) => {
              setProcessing(true);
              baseApi
                .Login(values)
                .then((DATA) => {
                  if (DATA?.token) {
                    window.sessionStorage.setItem(
                      "accountInfo",
                      JSON.stringify(DATA)
                    );
                    window.location.href = "/";
                  }
                })
                .finally(() => {
                  setProcessing(false);
                });
            });
          }}
        >
          登录
        </Button>
      </div>
    </section>
  );
};

Fragment.defaultProps = {};

export default Fragment;
