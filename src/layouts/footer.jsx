import React from 'react';
import { Layout } from 'antd';
import styles from './index.module.less';

const { Footer } = Layout;

const Fragment = () => (
  <Footer className={styles.footer}>浙江中核信息科技有限公司</Footer>
);

Fragment.defaultProps = {};

export default Fragment;
