import React, { useState } from 'react'

import { Table, Input, Button, Space, Tag } from 'antd'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'

const data = [
  {
    key: '1',
    dateAndTime: 'May 19, 2020 11:00:00 AM',
    course: 'BSN',
    program: 'Intensive',
    payment: 1000,
    method: 'Paymaya',
    status: 'Cancelled',
    ref: 'oiuydofysdu890738',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    dateAndTime: 'May 20, 2020 11:00:00 PM',
    course: 'BSN',
    program: 'Intensive',
    payment: 2000,
    method: 'Palawan',
    status: 'ISU-IHT8V-ZAW',
    ref: 'dsfj9873377fjdsbzzx',
    address: 'London No. 1 Lake Park',
  },
]

const StudentPaymentTable = () => {
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
      title: 'Date and Time',
      dataIndex: 'dateAndTime',
      key: 'dateAndTime',
      ...getColumnSearchProps('dateAndTime'),
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
      title: 'Payment Made',
      dataIndex: 'payment',
      key: 'payment',
      ...getColumnSearchProps('payment'),
    },
    {
      title: 'Payment Type',
      dataIndex: 'method',
      key: 'method',
      ...getColumnSearchProps('method'),
    },
    {
      title: 'Reference No.',
      key: 'ref',
      dataIndex: 'ref',
      render: (ref) => (
        <Tag color='green' key={ref}>
          {ref.toUpperCase()}
        </Tag>
      ),
    },
  ]

  return <Table columns={columns} dataSource={data} />
}

export default StudentPaymentTable
