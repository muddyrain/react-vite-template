import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
import { FC } from "react";

const Fragment: FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="页面走失啦..."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          返回首页
        </Button>
      }
    />
  );
};

Fragment.defaultProps = {};

export default Fragment;
