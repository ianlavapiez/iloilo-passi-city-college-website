import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  CreditCardOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

import './sidebar.styles.scss';

const { Sider } = Layout;

const Sidebar = ({ number }) => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider
      className='student-sider'
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <div className='logo' />
      <Menu theme='light' defaultSelectedKeys={[number]} mode='inline'>
        <Menu.Item key='1' icon={<DashboardOutlined />}>
          <Link to='/courses'>Courses</Link>
        </Menu.Item>
        <Menu.Item key='2' icon={<CreditCardOutlined />}>
          <Link to='/facilities'>Facilities</Link>
        </Menu.Item>
        <Menu.Item key='3' icon={<CalendarOutlined />}>
          <Link to='/events'>Events</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
