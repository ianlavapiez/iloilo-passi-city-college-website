import React from 'react'
import { Layout, Menu, Typography } from 'antd'

import { UserOutlined } from '@ant-design/icons'

const { Header } = Layout
const { Title } = Typography

const Navbar = () => {
  return (
    <Header
      className='site-layout-background'
      style={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}
    >
      <Title
        level={4}
        style={{
          color: '#fff',
          fontWeight: 300,
          paddingTop: 17,
          paddingLeft: 17,
        }}
      >
        Admin Portal
      </Title>
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
        <Menu.Item key='1' icon={<UserOutlined />}>
          User
        </Menu.Item>
      </Menu>
    </Header>
  )
}

export default Navbar
