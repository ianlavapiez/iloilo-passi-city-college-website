import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Layout, Menu, Typography, Button, Dropdown } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { signOutStart } from '../../../redux/user/user.actions'
import { fetchAccountingDetailsStart } from '../../../redux/accounting/accounting.actions'

const { Header } = Layout
const { Title } = Typography

const Navbar = ({
  currentUser,
  signOutStart,
  history,
  fetchAccountingDetailsStart,
}) => {
  useEffect(() => {
    // if (currentUser && currentUser.type !== 'student') {
    //   return history.push('/student/login')
    // } else {
    //   fetchAccountingDetailsStart()
    // }
    fetchAccountingDetailsStart()
  }, [fetchAccountingDetailsStart])

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
  fetchAccountingDetailsStart: () => dispatch(fetchAccountingDetailsStart()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
