import { FC, useEffect } from "react";
import { Block, Tabler } from "@/components";
import columns from "./columns";
import { useModels } from "./models";
import { useNavigate } from "react-router-dom";

const Fragment: FC = () => {
  const { add, state, getList, dispatch } = useModels({});
  const { loading, datalist, pageNum, pageSize, total, updater } = state;
  useEffect(() => {
    getList({ pageNum, pageSize });
  }, [updater, pageNum, pageSize]);
  const query = (values = {}) => dispatch({ pageNum: 1, ...values });
  return (
    <Block>
      <Tabler
        loading={loading}
        columns={columns}
        dataSource={datalist}
        actionsWidth={120}
        rowKey="id"
        pagination={{ current: pageNum, pageSize: pageSize, total }}
        onPageChange={({ page, size }) =>
          query({ pageNum: page, pageSize: size })
        }
      />
    </Block>
  );
};
export default Fragment;
