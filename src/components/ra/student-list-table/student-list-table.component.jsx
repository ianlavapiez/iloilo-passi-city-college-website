import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Table, Input, Button, Space, Tag } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'

const StudentListTable = ({ students }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  let searchInput

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
  ]

  return (
    <Table
      rowKey={(record) => record.id}
      columns={columns}
      dataSource={students ? students : []}
    />
  )
}

const mapStateToProps = (state) => ({
  students: state.students.students
    ? state.students.students.filter(
        (student) => student.type === 'student' && student.verified === true
      )
    : [],
})

export default connect(mapStateToProps)(StudentListTable)
