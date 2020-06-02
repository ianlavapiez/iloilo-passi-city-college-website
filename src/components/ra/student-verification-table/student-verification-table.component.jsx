import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Input, Button, Space, Menu, Dropdown, Tag, Spin } from 'antd'
import Highlighter from 'react-highlight-words'
import {
  SearchOutlined,
  CheckCircleOutlined,
  MoreOutlined,
} from '@ant-design/icons'

import { verifyStudents } from '../../../redux/students/students.actions'
import { fireAlertWithConfirmation } from '../../common/confirmation-message/confirmation-message.component'

const StudentVerificationTable = ({ students, verifyStudents, loading }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  let searchInput

  const verifyStudent = (student) => {
    student.verified = true

    fireAlertWithConfirmation(
      'Are you sure you want to verify the student?',
      'Successfully verified!',
      (confirmed) => {
        if (confirmed) {
          verifyStudents(student)
        } else {
          return false
        }
      }
    )
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select())
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  })

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }

  const columns = [
    {
      title: 'Fullname',
      dataIndex: 'displayName',
      key: 'displayName',
      ...getColumnSearchProps('displayName'),
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      ...getColumnSearchProps('course'),
    },
    {
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
      ...getColumnSearchProps('program'),
    },
    {
      title: 'Contact No.',
      dataIndex: 'contact',
      key: 'contact',
      ...getColumnSearchProps('contact'),
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Verified',
      key: 'verified',
      dataIndex: 'verified',
      render: (verified) => {
        if (verified === true) {
          return (
            <Tag color={'green'} key={1}>
              YES
            </Tag>
          )
        } else {
          return (
            <Tag color={'volcano'} key={2}>
              NO
            </Tag>
          )
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text) => (
        <span>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => verifyStudent(text)}>
                  <CheckCircleOutlined /> verify
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button type='default' icon={<MoreOutlined />} />
          </Dropdown>
        </span>
      ),
    },
  ]

  return (
    <Spin spinning={loading} delay={500}>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={
          students
            ? students.filter((student) => student.verified === false)
            : []
        }
      />
    </Spin>
  )
}

const mapStateToProps = (state) => ({
  students: state.students.students,
  loading: state.async.loading,
})

const mapDispatchToProps = {
  verifyStudents,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentVerificationTable)
