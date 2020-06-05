import React, { useState, useEffect } from 'react'
import { Table, Input, Button, Space, Menu, Dropdown, Tag } from 'antd'
import Highlighter from 'react-highlight-words'
import {
  SearchOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  MoreOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { connect } from 'react-redux'

import { getPayments } from '../../../redux/payments/payments.actions'

const PaymentManagementTable = ({ getPayments, payments, raId }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  let searchInput

  useEffect(() => {
    if (raId) {
      getPayments(raId)
    }
  }, [raId, getPayments])

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
      title: 'Payment ID',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
      ...getColumnSearchProps('studentName'),
    },
    {
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
      ...getColumnSearchProps('program'),
    },
    {
      title: 'School Year',
      dataIndex: 'schoolYear',
      key: 'schoolYear',
      ...getColumnSearchProps('schoolYear'),
    },
    {
      title: 'Tuition Fee',
      dataIndex: 'fee',
      key: 'fee',
      ...getColumnSearchProps('fee'),
    },
    {
      title: 'Payments Made',
      key: 'paymentTrail',
      dataIndex: 'paymentTrail',
      render: (paymentTrail) => (
        <>
          {paymentTrail.length === 0 ? (
            <Tag color='red' key='1'>
              {'None'}
            </Tag>
          ) : (
            paymentTrail.map((payment) => (
              <Tag color='green' key={payment}>
                {payment}
              </Tag>
            ))
          )}
        </>
      ),
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
                <Menu.Item onClick={() => this.onPressedEdit(text)}>
                  <EditOutlined />
                  update payment
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

  return <Table columns={columns} dataSource={payments ? payments : []} />
}

const mapStateToProps = (state) => {
  return {
    raId: state.firebase.auth.uid,
    payments: state.payments.payments,
  }
}

const mapDispatchToProps = {
  getPayments,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentManagementTable)
