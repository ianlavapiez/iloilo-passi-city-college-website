import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Typography, Button, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { auth } from '../../../firebase/firebase.utils'

const { Header } = Layout
const { Title } = Typography

const Navbar = ({ history, adminId, currentUser }) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    if (currentUser) {
      if (currentUser[0]) {
        setUser(currentUser[0])

        if (currentUser[0].role !== 'admin') {
          auth.signOut()
          return history.push('/admin/login')
        }
      }
    }
  }, [setUser, currentUser, user, history])

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          auth.signOut()
          history.push('/admin/login')
        }}
      >
        <Link to='/'>Sign Out</Link>
      </Menu.Item>
    </Menu>
  )

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
          {user ? user.displayName : 'Admin'}
        </Button>
      </Dropdown>
    </Header>
  )
}

const mapStateToProps = (state) => {
  return {
    adminId: state.firebase.auth.uid,
    currentUser: state.auth.adminUser,
  }
}

export default withRouter(connect(mapStateToProps)(Navbar))
