import React, { useState } from 'react'

import { Table, Input, Button, Space, Menu, Dropdown, Tag } from 'antd'
import Highlighter from 'react-highlight-words'
import {
  SearchOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons'

const data = [
  {
    key: '1',
    type: 'Payment',
    to: 'Ian Hero L. Lavapiez',
    course: 'BSN',
    program: 'Intensive',
    status: 'Sent',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    type: 'Payment',
    to: 'ALL',
    course: 'BSN',
    program: 'Intensive',
    status: 'Sent',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    type: 'Schedule',
    to: 'ALL',
    course: 'BSN',
    program: 'Intensive',
    status: 'Not Sent',
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    type: 'Schedule',
    to: 'ALL',
    course: 'BSN',
    program: 'Intensive',
    status: 'Sent',
    address: 'London No. 2 Lake Park',
  },
]

const PaymentVerificationTable = () => {
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
      title: 'Dispatch Type',
      dataIndex: 'type',
      key: 'type',
      width: '20%',
      ...getColumnSearchProps('type'),
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
      width: '20%',
      ...getColumnSearchProps('to'),
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      width: '20%',
      ...getColumnSearchProps('course'),
    },
    {
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
      width: '20%',
      ...getColumnSearchProps('program'),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        if (status === 'Sent') {
          return (
            <Tag color={'green'} key={status}>
              {status.toUpperCase()}
            </Tag>
          )
        } else {
          return (
            <Tag color={'volcano'} key={status}>
              {status.toUpperCase()}
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
                <Menu.Item onClick={() => this.onPressedEdit(text)}>
                  <InfoCircleOutlined /> info
                </Menu.Item>
                <Menu.Item onClick={() => this.onPressedDelete(text)}>
                  <DeleteOutlined /> delete
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

  return <Table columns={columns} dataSource={data} />
}

export default PaymentVerificationTable
