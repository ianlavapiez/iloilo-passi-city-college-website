import React, { useState, useEffect } from 'react'
import { Table, Input, Button, Space, Tag } from 'antd'
import Highlighter from 'react-highlight-words'
import { withRouter } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

import { getPaymentTrail } from '../../../redux/payments/payments.actions'

const PaymentManagementInfoTable = ({
  paymentTrail,
  getPaymentTrail,
  paymentId,
}) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  let searchInput

  useEffect(() => {
    if (paymentId) {
      getPaymentTrail(paymentId)
    }
  }, [paymentId, getPaymentTrail])

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
      title: 'Reference ID',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      ...getColumnSearchProps('date'),
    },
    {
      title: 'Payment Made',
      dataIndex: 'payment',
      key: 'payment',
      ...getColumnSearchProps('payment'),
    },
    {
      title: 'Verified',
      key: 'verified',
      dataIndex: 'verified',
      render: (verified) => {
        let color, text
        if (verified === true) {
          color = 'green'
          text = 'Verified'
        } else {
          color = 'volcano'
          text = 'Not Verified'
        }

        return (
          <Tag color={color} key={verified}>
            {text.toUpperCase()}
          </Tag>
        )
      },
    },
  ]

  return (
    <Table
      columns={columns}
      dataSource={paymentTrail}
      rowKey={(record) => record.refId}
    />
  )
}

const mapStateToProps = (state, ownParams) => {
  return {
    raId: state.firebase.auth.uid,
    paymentId: ownParams.match.params.id,
    paymentTrail: state.payments.paymentTrail,
  }
}

const mapDispatchToProps = {
  getPaymentTrail,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PaymentManagementInfoTable)
)
