import React, { useEffect, useCallback } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Typography, Button, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { auth } from '../../../firebase/firebase.utils'
import { getUserDetails } from '../../../redux/auth/auth.actions'

const { Header } = Layout
const { Title } = Typography

const Navbar = ({ history, getUserDetails, uid, currentUser }) => {
  const checkIfUserIsStudent = useCallback(() => {
    if (currentUser === null || currentUser.length === 0) {
      auth.signOut()
      return history.push('/student/login')
    } else {
      if (currentUser && currentUser[0]) {
        if (currentUser[0].type !== 'student') {
          auth.signOut()
          return history.push('/student/login')
        }
      }
    }
  }, [])

  const getDetails = useCallback(async () => {
    if (uid) {
      await getUserDetails(uid)

      checkIfUserIsStudent()
    } else {
      auth.signOut()
      return history.push('/student/login')
    }
  }, [getUserDetails, uid, checkIfUserIsStudent, history])

  useEffect(() => {
    getDetails()
  }, [getDetails])

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          auth.signOut()
          history.push('/student/login')
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
        Student Portal
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
          Student
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
