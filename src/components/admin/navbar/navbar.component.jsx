import React, { useEffect, useCallback } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Typography, Button, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { auth } from '../../../firebase/firebase.utils'
import { getUserDetails } from '../../../redux/auth/auth.actions'

const { Header } = Layout
const { Title } = Typography

const Navbar = ({ history, getUserDetails, uid, currentUser }) => {
  const checkIfUserIsAdmin = useCallback(() => {
    if (currentUser === null || currentUser.length === 0) {
      auth.signOut()
      return history.push('/admin/login')
    } else {
      if (currentUser && currentUser[0]) {
        if (currentUser[0].type !== 'admin') {
          auth.signOut()
          return history.push('/admin/login')
        }
      }
    }
  }, [])

  const getDetails = useCallback(async () => {
    if (uid) {
      await getUserDetails(uid, 'admin')

      checkIfUserIsAdmin()
    } else {
      auth.signOut()
      return history.push('/admin/login')
    }
  }, [uid, checkIfUserIsAdmin, history])

  useEffect(() => {
    getDetails()
  }, [getDetails])

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
          {currentUser && currentUser[0] ? currentUser[0].displayName : 'Admin'}
        </Button>
      </Dropdown>
    </Header>
  )
}

const mapStateToProps = (state) => {
  return {
    uid: state.firebase.auth.uid,
    currentUser: state.auth.currentUser,
  }
}

const mapDispatchToProps = {
  getUserDetails,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
