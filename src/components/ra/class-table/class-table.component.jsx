import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Table, Input, Button, Space, Menu, Dropdown, Tag } from 'antd'
import Highlighter from 'react-highlight-words'
import {
  SearchOutlined,
  EditOutlined,
  FormOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import { connect } from 'react-redux'

import { deleteClassRecord } from '../../../redux/class/class.actions'
import { fireAlertWithConfirmation } from '../../common/confirmation-message/confirmation-message.component'

const ClassTable = ({
  classes,
  setEdit,
  setModalVisible,
  setData,
  deleteClassRecord,
  setStatusModalVisible,
}) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  let searchInput

  const editClassDetails = (classData) => {
    setData(classData)
    setEdit(true)
    setModalVisible(true)
  }

  const editStatusDetails = (classData) => {
    setData(classData)
    setStatusModalVisible(true)
  }

  const deleteClassDetails = (classData) => {
    fireAlertWithConfirmation(
      'Are you sure you want to delete?',
      'Successfully deleted!',
      (confirmed) => {
        if (confirmed) {
          deleteClassRecord(classData)
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      ...getColumnSearchProps('date'),
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      ...getColumnSearchProps('startTime'),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      ...getColumnSearchProps('endTime'),
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
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      ...getColumnSearchProps('subject'),
    },
    {
      title: 'Professor',
      dataIndex: 'professor',
      key: 'professor',
      ...getColumnSearchProps('professor'),
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
              <Menu>
                <Menu.Item onClick={() => editStatusDetails(text)}>
                  <FormOutlined /> update status
                </Menu.Item>
                <Menu.Item onClick={() => editClassDetails(text)}>
                  <EditOutlined /> edit details
                </Menu.Item>
                <Menu.Item onClick={() => deleteClassDetails(text)}>
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

  return (
    <Table
      columns={columns}
      dataSource={classes ? classes : []}
      rowKey={(record) => record.id}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    classes: state.classes.classes,
  }
}

const mapDispatchToProps = {
  deleteClassRecord,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ClassTable)
)
