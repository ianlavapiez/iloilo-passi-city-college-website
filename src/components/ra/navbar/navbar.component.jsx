import React, { useEffect, useCallback } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Typography, Button, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { auth } from '../../../firebase/firebase.utils'
import { getRAUserDetails } from '../../../redux/auth/auth.actions'

const { Header } = Layout
const { Title } = Typography

const Navbar = ({ history, getRAUserDetails, uid, currentUser }) => {
  const getDetails = useCallback(async () => {
    let newStorage = {}
    if (uid !== undefined) {
      localStorage.setItem('uid', uid)
      return await getRAUserDetails(uid)
    }

    newStorage.uid = localStorage.getItem('uid')
    newStorage.type = localStorage.getItem('type')

    if (newStorage.uid === '' || newStorage.type !== 'ra') {
      localStorage.setItem('uid', '')
      localStorage.setItem('type', '')
      auth.signOut()
      return history.push('/ra/login')
    }
  }, [getRAUserDetails, uid, history])

  useEffect(() => {
    getDetails()
  }, [getDetails])

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          localStorage.setItem('uid', '')
          localStorage.setItem('type', '')
          auth.signOut()
          history.push('/ra/login')
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
        RA Portal
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
          {currentUser && currentUser[0] ? currentUser[0].displayName : 'RA'}
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
  getRAUserDetails,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
