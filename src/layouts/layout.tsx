import React, { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import styles from './index.module.less'
import { RoutesProps } from '@/router/interface'
import Header from './header'
import Footer from './footer'
import Sider from './sider'
import Breadcrumb from './breadcrumb'

const { Content } = Layout

export interface LayoutProps {
  routes: RoutesProps[]
  configuration: RoutesProps
  children: React.ReactNode
}
const Fragment: FC<LayoutProps> = ({ routes, configuration, children }) => {
  const navigate = useNavigate()
  const accountJSON = window.sessionStorage.getItem('accountInfo')
  const accountInfo = JSON.parse(accountJSON || '{}')
  const pureType = Object.prototype.toString.call(configuration?.pure)

  useEffect(() => {
    const needLoginType = Object.prototype.toString.call(configuration?.needLogin)
    if (!(needLoginType === '[object Boolean]' && !configuration.needLogin)) {
      !accountInfo?.token && navigate('/login')
    }
  }, [configuration])

  if (pureType === '[object Boolean]' && pureType) {
    return (
      <section style={configuration?.style || {}}>
        {React.Children.map(children, (child) =>
          React.cloneElement(child as any, {
            authority: configuration?.auths || []
          })
        )}
      </section>
    )
  } else {
    return (
      <Layout className={`${styles.layout} flex-col`}>
        <div className='flex flex-col w-full'>
          <Header routes={routes} configuration={configuration} accountInfo={accountInfo} />

          <div className={`w-full flex-1 flex overflow-hidden`}>
            <Sider routes={routes} configuration={configuration} accountInfo={accountInfo} />
            <div className='flex flex-col flex-1  overflow-hidden'>
              <Breadcrumb routes={routes} configuration={configuration} accountInfo={accountInfo} />
              <Content className={`${styles.content} `}>
                <section>
                  {React.Children.map(children, (child) =>
                    React.cloneElement(child as any, {
                      authority: configuration?.auths || []
                    })
                  )}
                </section>
              </Content>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

Fragment.defaultProps = {
  configuration: {},
  routes: []
}

export default Fragment
