import { Layout } from 'antd'
import styles from './index.module.less'
import { FOOTER_CONTENT_TEXT } from '@/constant'

const { Footer } = Layout

const Fragment = () => <Footer className={styles.footer}>{FOOTER_CONTENT_TEXT}</Footer>

Fragment.defaultProps = {}

export default Fragment
