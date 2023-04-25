export interface RoutesProps {
  name?: string
  path?: string
  pure?: boolean
  hideMenu?: boolean
  style?: React.CSSProperties | undefined
  breadcrumb?: { name?: string; link?: string; href?: string; path?: string }[]
  needLogin?: string
  parentPath?: string
  element?: React.ReactNode
  icon?: React.ReactNode
  children?: RoutesProps[]
  auths?: string[]
}
