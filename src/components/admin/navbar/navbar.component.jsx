import React from 'react'
import { Layout, Menu } from 'antd'

import { UserOutlined } from '@ant-design/icons'

const { Header } = Layout

const Navbar = () => {
  return (
    <Header
      className='site-layout-background'
      style={{ padding: 0, display: 'flex', justifyContent: 'flex-end' }}
    >
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
        <Menu.Item key='1' icon={<UserOutlined />}>
          User
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default Navbar
