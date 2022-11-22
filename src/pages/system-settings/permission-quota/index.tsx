import { FC, useEffect } from "react";
import { Block, Tabler } from "@/components";
import { useModels } from "./models";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Tree } from "antd";
import columns from "./columns";

const Fragment: FC = () => {
  const navigate = useNavigate();
  const { state, dispatch, getData, handleSubmit, handleChangeSelect } =
    useModels({
      roleInfo: {},
      selectedRowKeys: [],
      isHandleSelection: false,
    });
  const { loading, total, updater, datalist, roleInfo, selectedRowKeys } =
    state;
  useEffect(() => {
    getData({});
  }, [updater]);
  return (
    <Block className="flex flex-col" loading={loading}>
      <div className="mb-2 flex justify-between items-center">
        <span>当前角色: {roleInfo?.roleName}</span>
        <Button type="primary" onClick={handleSubmit}>
          保存
        </Button>
      </div>
      <Tabler
        className="flex-1"
        columns={columns}
        rowSelection={{
          selections: true,
          checkStrictly: false,
          onChange: handleChangeSelect,
          selectedRowKeys,
        }}
        dataSource={datalist}
        ordered={false}
        defaultExpandAllRows={true}
        key={JSON.stringify(selectedRowKeys)}
        expandable={{
          childrenColumnName: "childrenList",
          indentSize: 80,
        }}
        actionsWidth={200}
        rowKey="id"
        actions={[
          {
            key: "add",
            visible: (record) => record.menuType === 1,
            content: (record) => (
              <Checkbox
                defaultChecked={record.buttonInsert}
                onChange={(e) => (record.buttonInsert = e.target.checked)}
              >
                新增
              </Checkbox>
            ),
          },
          {
            key: "edit",
            visible: (record) => record.menuType === 1,
            content: (record) => (
              <Checkbox
                defaultChecked={record.buttonUpdate}
                onChange={(e) => (record.buttonUpdate = e.target.checked)}
              >
                修改
              </Checkbox>
            ),
          },
          {
            key: "delete",
            visible: (record) => record.menuType === 1,
            content: (record) => (
              <Checkbox
                defaultChecked={record.buttonDelete}
                onChange={(e) => (record.buttonDelete = e.target.checked)}
              >
                删除
              </Checkbox>
            ),
          },
        ]}
      />
    </Block>
  );
};
export default Fragment;
