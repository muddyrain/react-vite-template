import React, { FC } from "react";
import { Spin } from "antd";
import styles from "./index.module.less";
import { CommonComponentsProps } from "@/interface/commonComponentsProps";

interface BlockProps extends CommonComponentsProps {
  loading?: boolean;
  backgroundColor?: string;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
}
const Block: FC<BlockProps> = ({
  children,
  loading = false,
  className,
  style = {},
  backgroundColor = "transparent",
  onClick,
}) => (
  <Spin spinning={loading}>
    <section
      className={`${styles.block} ${className}`}
      style={{ backgroundColor, ...style }}
      onClick={onClick}
    >
      {children}
    </section>
  </Spin>
);

Block.defaultProps = {
  onClick: () => {},
};

export default Block;
