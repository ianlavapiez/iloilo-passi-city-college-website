import React, { useState } from 'react'
import { Table, Input, Button, Space, Checkbox } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'

const data = [
  {
    id: '1',
    displayName: 'Ian Hero L. Lavapiez',
    email: 'ianlavapiez@gmail.com',
    contact: '09771069640',
  },
  {
    id: '2',
    displayName: 'Will Smith',
    email: 'willsmith@gmail.com',
    contact: '09171646475',
  },
  {
    id: '3',
    displayName: 'Katy Perry',
    email: 'katyperry@gmail.com',
    contact: '09263339008',
  },
  {
    id: '4',
    displayName: 'Snopp Doog',
    email: 'snoopdog@gmail.com',
    contact: '09123322918',
  },
]

const ManageAttendanceTable = ({ students, verifyStudents, loading }) => {
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
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Contact No.',
      dataIndex: 'contact',
      key: 'contact',
      ...getColumnSearchProps('contact'),
    },
    {
      title: 'Attendance',
      dataIndex: 'attendance',
      render: () => <Checkbox />,
    },
  ]

  return (
    <Table rowKey={(record) => record.id} columns={columns} dataSource={data} />
  )
}

export default ManageAttendanceTable
