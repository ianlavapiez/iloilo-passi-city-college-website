import React, { useEffect, useCallback } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Typography, Button, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { auth } from '../../../firebase/firebase.utils'
import { getAdminUserDetails } from '../../../redux/auth/auth.actions'

const { Header } = Layout
const { Title } = Typography

const Navbar = ({ history, getAdminUserDetails, uid, currentUser }) => {
  const getDetails = useCallback(async () => {
    let newStorage = {}
    if (uid !== undefined) {
      window.localStorage.setItem('uid', uid)
      return await getAdminUserDetails(uid)
    }

    newStorage.uid = window.localStorage.getItem('uid')
    newStorage.type = window.localStorage.getItem('type')

    if (newStorage.uid === '' || newStorage.type !== 'admin') {
      window.localStorage.setItem('uid', '')
      window.localStorage.setItem('type', '')
      auth.signOut()

      const redirect = () => {
        history.push('admin/login')
        window.location.reload()
      }

      return redirect()
    }
  }, [getAdminUserDetails, uid, history])

  useEffect(() => {
    getDetails()
  }, [getDetails])

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          window.localStorage.setItem('uid', '')
          window.localStorage.setItem('type', '')
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
  getAdminUserDetails,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
