import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Typography, Button, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { authenticatedFalse } from '../../../redux/authenticated/authenticated.actions';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = ({ history }) => {
  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          authenticatedFalse();
          history.push('/admin/login');
        }}
      >
        <Link to='/'>Sign Out</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className='site-layout-background'
      style={{
        padding: 0,
        display: 'flex',
        justifyContent: 'space-between',
      }}
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
      <Dropdown overlay={menu} placement='bottomCenter'>
        <Button
          style={{
            backgroundColor: '#052240',
            color: 'white',
            border: 'none',
            marginTop: 20,
            marginRight: 10,
          }}
          icon={<UserOutlined />}
        >
          Administrator
        </Button>
      </Dropdown>
    </Header>
  );
};

export default withRouter(Navbar);
