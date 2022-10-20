import React, { FC } from "react";
import { Spin } from "antd";
import styles from "./index.module.less";
import { CommonComponentsProps } from "@/interface/commonComponentsProps";

interface BlockProps extends CommonComponentsProps {
  loading?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}
const Fragment: FC<BlockProps> = ({
  children,
  loading,
  className,
  style,
  onClick,
}) => (
  <Spin spinning={loading}>
    <section
      className={`${styles.block} ${className}`}
      style={style}
      onClick={onClick}
    >
      {!loading ? children : null}
    </section>
  </Spin>
);

Fragment.defaultProps = {
  children: undefined,
  loading: false,
  className: "",
  style: {},
  onClick: () => {},
};

export default Fragment;
