import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Table, Input, Button, Space, Menu, Dropdown, Tag } from 'antd'
import Highlighter from 'react-highlight-words'
import {
  SearchOutlined,
  EditOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons'

const data = [
  {
    key: '1',
    dateAndTime: 'May 19, 2020 11:00:00 AM',
    course: 'BSN',
    program: 'Intensive',
    details: 'Sample Details',
    status: 'Cancelled',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    dateAndTime: 'May 20, 2020 11:00:00 PM',
    course: 'BSN',
    program: 'Intensive',
    details: 'Sample Details',
    status: 'Pending',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    dateAndTime: 'May 21, 2020 09:00:00 AM',
    course: 'BSN',
    program: 'Intensive',
    details: 'Sample Details',
    status: 'Done',
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    dateAndTime: 'May 22, 2020 08:00:00 AM',
    course: 'BSN',
    program: 'Intensive',
    details: 'Sample Details',
    status: 'On-going',
    address: 'London No. 2 Lake Park',
  },
]

const AttendanceTable = ({ history }) => {
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
      width: '20%',
      ...getColumnSearchProps('dateAndTime'),
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
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      width: '20%',
      ...getColumnSearchProps('details'),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color
        if (status === 'On-going') {
          color = 'blue'
        } else if (status === 'Done') {
          color = 'green'
        } else if (status === 'Pending') {
          color = 'orange'
        } else {
          color = 'volcano'
        }

        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text) => (
        <span>
          <Dropdown
            overlay={
              <Fragment>
                {text.status === 'On-going' ? (
                  <Menu>
                    <Menu.Item
                      onClick={() => history.push('/ra/manage-attendance/')}
                    >
                      <CheckCircleOutlined /> manage attendance
                    </Menu.Item>
                    <Menu.Item onClick={() => this.onPressedEdit(text)}>
                      <EditOutlined /> edit details
                    </Menu.Item>
                    <Menu.Item onClick={() => this.onPressedDelete(text)}>
                      <DeleteOutlined /> delete
                    </Menu.Item>
                  </Menu>
                ) : (
                  <Menu>
                    <Menu.Item onClick={() => this.onPressedEdit(text)}>
                      <EditOutlined /> edit details
                    </Menu.Item>
                    <Menu.Item onClick={() => this.onPressedDelete(text)}>
                      <DeleteOutlined /> delete
                    </Menu.Item>
                  </Menu>
                )}
              </Fragment>
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

export default withRouter(AttendanceTable)
