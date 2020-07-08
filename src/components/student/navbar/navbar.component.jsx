import React, { useEffect, useCallback } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Typography, Button, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'

import { getStudentUserDetails } from '../../../redux/auth/auth.actions'
import { auth } from '../../../firebase/firebase.utils'

const { Header } = Layout
const { Title } = Typography

const Navbar = ({ history, getStudentUserDetails, uid, currentUser }) => {
  const getDetails = useCallback(async () => {
    let newStorage = {}
    if (uid !== undefined) {
      window.localStorage.setItem('uid', uid)
      return await getStudentUserDetails(uid)
    }

    newStorage.uid = window.localStorage.getItem('uid')
    newStorage.type = window.localStorage.getItem('type')

    if (newStorage.uid === '' || newStorage.type !== 'student') {
      window.localStorage.setItem('uid', '')
      window.localStorage.setItem('type', '')
      auth.signOut()

      const redirect = () => {
        history.push('student/login')
        window.location.reload()
      }

      return redirect()
    }
  }, [getStudentUserDetails, uid, history])

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
          {currentUser && currentUser[0]
            ? currentUser[0].displayName
            : 'Student'}
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
  getStudentUserDetails,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
