import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { DashboardOutlined, BarChartOutlined } from '@ant-design/icons'

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
      className='student-sider'
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div className='logo'>
        <img className='student-logo' src={bannerImage} alt='Brainhub' />
      </div>
      <Menu theme='light' defaultSelectedKeys={[number]} mode='inline'>
        <Menu.Item key='1' icon={<DashboardOutlined />}>
          <Link to='/student'>Enrollment</Link>
        </Menu.Item>
        <Menu.Item key='2' icon={<BarChartOutlined />}>
          <Link to='/student/payments'>Payments</Link>
        </Menu.Item>
        <Menu.Item key='3' icon={<BarChartOutlined />}>
          <Link to='/student/schedule'>Your Schedule</Link>
        </Menu.Item>
        <Menu.Item key='4' icon={<BarChartOutlined />}>
          <Link to='/student/tutorials'>Tutorials</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar
