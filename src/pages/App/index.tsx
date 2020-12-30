/***
 * author 许诺
 * 页面框架
 ***/

import React, {FC, useState} from 'react'
import {Layout, Menu, Breadcrumb} from 'antd'
import { Route, HashRouter, Redirect } from 'react-router-dom'
import router from '../../router'

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CopyOutlined,
  StarOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

import './index.less'
import ToolBar from './ToolBar'

const {Header, Footer, Sider, Content} = Layout;

const Index: FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const toggle = () => {
    setCollapsed(collapsed => !collapsed)
  }

  return (
    <Layout className="App">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        onBreakpoint={broken => {
          setCollapsed(broken);
        }}
        collapsed={collapsed}
        theme={"light"}
      >
        <div className="logo">
          <img src="/src/assets/logo.png" />
          <span>nuoDrive</span>
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<CopyOutlined />}>
            全部文件
          </Menu.Item>
          <Menu.Item key="2" icon={<StarOutlined />}>
            收藏文件
          </Menu.Item>
          <Menu.Item key="3" icon={<ShareAltOutlined />}>
            我的分享
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className="header" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
          <div id="breadcrumb" />
        </Header>
        <Content className="content">
          <div id="toolBar" />
          <div className="site-layout-background" style={{ padding: "0 8px", flex: 1, overflow: "auto" }}>
            <HashRouter>
              {router.map(({ path, component, exact } )=> {
                return <Route exact={exact} path={path} component={component} key={path}/>
              })}
              <Redirect from="/" to="/home"/>
            </HashRouter>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Index
