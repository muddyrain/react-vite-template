import React, { FC } from "react";
import { Spin } from "antd";
import styles from "./index.module.less";
import { commonComponentsProps } from "@/interface/commonComponentsProps";

interface BlockProps extends commonComponentsProps {
  children?: React.ReactNode;
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
      {children}
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
