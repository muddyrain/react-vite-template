import { FC, useEffect } from "react";
import { Block, Tabler } from "@/components";
import Operation from "./operation";
import columns from "./columns";
import { useModels } from "./models";
import { useNavigate } from "react-router-dom";

const Fragment: FC = () => {
  const navigate = useNavigate();
  const { update, add, del, state, getList, dispatch, getRoleList } = useModels(
    {}
  );
  const {
    loading,
    roleLoading,
    datalist,
    pageNum,
    pageSize,
    total,
    updater,
    organizationList,
    roleList,
  } = state;
  useEffect(() => {
    getList({ pageNum, pageSize });
  }, [updater, pageNum, pageSize]);
  const query = (values = {}) => dispatch({ pageNum: 1, ...values });
  return (
    <Block className="flex flex-col">
      <div className="flex justify-start">
        <Operation
          roleLoading={roleLoading}
          getRoleList={getRoleList}
          organizationList={organizationList}
          roleList={roleList}
          onSubmit={(values, hide) => add(values, hide)}
        />
      </div>
      <Tabler
        className="flex-1"
        loading={loading}
        columns={columns}
        dataSource={datalist}
        actionsWidth={120}
        rowKey="id"
        actionsProps={{
          fixed: "right",
        }}
        actions={[
          {
            key: "add",
            content: (record) => (
              <Operation
                openText="修改"
                record={record}
                openButtonProps={{ type: "link" }}
                organizationList={organizationList}
                roleList={roleList}
                onSubmit={(values, hide) => update(values, hide)}
              />
            ),
            onClick: () => navigate("/home"),
          },
          {
            key: "delete",
            content: "删除",
            confirm: "确认删除？",
            props: { danger: true },
            onClick: ({ id }, index) => {
              del({ id });
            },
          },
        ]}
        pagination={{ current: pageNum, pageSize: pageSize, total }}
        onPageChange={({ page, size }) =>
          query({ pageNum: page, pageSize: size })
        }
      />
    </Block>
  );
};
export default Fragment;
