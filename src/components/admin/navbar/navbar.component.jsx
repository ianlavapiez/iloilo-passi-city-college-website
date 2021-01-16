import React, { useEffect, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Typography, Button, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { auth } from '../../../firebase/firebase.utils';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = ({ history, currentUser }) => {
  const checkUser = useCallback(() => {
    if (currentUser === null || currentUser.length === 0) {
      auth.signOut();
      return history.push('/');
    }
  }, [currentUser, history]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          auth.signOut();
          history.push('/');
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default withRouter(connect(mapStateToProps)(Navbar));
