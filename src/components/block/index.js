import React from 'react';
import { Spin } from 'antd';
import styles from './index.module.less';

const Fragment = ({ children, loading, className, style, onClick }) => (
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
  className: '',
  style: {},
  onClick: () => {},
};

export default Fragment;
