import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Typography, Button, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { signOutStart } from '../../../redux/user/user.actions'
import { fetchStudentStart } from '../../../redux/student/student.actions'
import { fetchAccountingDetailsStart } from '../../../redux/accounting/accounting.actions'

const { Header } = Layout
const { Title } = Typography

const Navbar = ({
  currentUser,
  signOutStart,
  fetchStudentStart,
  fetchAccountingDetailsStart,
  history,
}) => {
  useEffect(() => {
    // if (currentUser && currentUser.type !== 'ra') {
    //   return history.push('/ra/login')
    // }

    fetchStudentStart()
    fetchAccountingDetailsStart()
  }, [fetchStudentStart, fetchAccountingDetailsStart])

  const menu = (
    <Menu>
      <Menu.Item onClick={() => signOutStart()}>
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
          {currentUser ? currentUser.displayName : ''}
        </Button>
      </Dropdown>
    </Header>
  )
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser ? state.user.currentUser : [],
  success: state.user.isSuccessful,
})

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
  fetchStudentStart: () => dispatch(fetchStudentStart()),
  fetchAccountingDetailsStart: () => dispatch(fetchAccountingDetailsStart()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
