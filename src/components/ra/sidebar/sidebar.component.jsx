import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  DashboardOutlined,
  ReadOutlined,
  CheckCircleOutlined,
  RightSquareOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'

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
      className='ra-sider'
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div className='logo'>
        <img className='sidebar-logo' src={bannerImage} alt='Brainhub' />
      </div>
      <Menu theme='light' defaultSelectedKeys={[number]} mode='inline'>
        <Menu.Item key='1' icon={<DashboardOutlined />}>
          <Link to='/ra'>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key='2' icon={<ReadOutlined />}>
          <Link to='/ra/accounting'>Accounting</Link>
        </Menu.Item>
        <Menu.Item key='3' icon={<CheckCircleOutlined />}>
          <Link to='/ra/attendance'>Attendance</Link>
        </Menu.Item>
        <Menu.Item key='3' icon={<RightSquareOutlined />}>
          <Link to='/ra/dispatching'>Dispatching</Link>
        </Menu.Item>
        <Menu.Item key='4' icon={<UserSwitchOutlined />}>
          <Link to='/ra/student-management'>Student Management</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default Sidebar
