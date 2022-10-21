import React, { useState, useEffect, FC } from "react";
import { Button } from "antd";
import { Title, Icon } from "@bees/ui";
import { Block, Former } from "@/components";
import { SEX } from "@/constant";

const Fragment: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <Block loading={loading}>
      <Title level={1} strong title="首页" icon={<Icon type="function" />}>
        <Button type="link" size="small" icon={<Icon type="more" />} />
      </Title>
      <Former
        labelCol={8}
        wrapperCol={16}
        gutter={0}
        column={3}
        onSubmit={(e) => {
          console.log(e);
        }}
        datasource={({ checks }) => [
          {
            label: "上传照片",
            key: "upload-image",
            required: true,
            view: "UploaderImage",
            viewProps: {
              returnFormatter(response, file) {
                return "11";
              },
            },
          },
          {
            label: "上传文件",
            key: "upload",
            required: true,
            view: "UploaderFile",
          },
          {
            label: "输入框",
            key: "input",
            view: "Input",
            required: true,
            type: "integer",
            rules: [{ type: "amount" }],
            viewProps: {
              size: "middle",
            },
          },
          {
            label: "多选框",
            key: "checks",
            required: true,
            view: "CheckboxGroup",
            viewProps: {
              options: [
                { label: "Apple", value: "Apple" },
                { label: "Pear", value: "Pear" },
                { label: "Orange", value: "Orange" },
              ],
            },
          },
          {
            visible: (checks || []).includes("Apple"),
            label: "选择框",
            key: "select",
            view: "Select",
            viewProps: {
              options: SEX,
            },
          },
        ]}
      />
    </Block>
  );
};

export default Fragment;
