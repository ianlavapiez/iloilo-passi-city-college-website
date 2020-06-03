import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { DashboardOutlined } from '@ant-design/icons'

import './sidebar.styles.scss'

import bannerImage from '../../../assets/brainhub.png'

const { Sider } = Layout

const Sidebar = ({ number }) => {
  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }

  return (
    <Sider
      className='admin-sider'
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div className='logo'>
        <img className='admin-logo' src={bannerImage} alt='Brainhub' />
      </div>
      <Menu theme='light' defaultSelectedKeys={[number]} mode='inline'>
        <Menu.Item key='1' icon={<DashboardOutlined />}>
          <Link to='/admin'>Dashboard</Link>
        </Menu.Item>
        {/* <Menu.Item key='2' icon={<BarChartOutlined />}>
          <Link to='/admin/statistics-and-reports'>Statistics and Reports</Link>
        </Menu.Item> */}
      </Menu>
    </Sider>
  )
}

export default Sidebar
