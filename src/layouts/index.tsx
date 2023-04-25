import Layout, { LayoutProps } from './layout'
import NotFound from './not-found'
import config from '@/router'

interface CompoundedComponent extends React.ForwardRefExoticComponent<LayoutProps> {
  NotFound: typeof NotFound
}
const TransLayout = Layout as CompoundedComponent
TransLayout.NotFound = NotFound
export const routes = config
export default TransLayout
