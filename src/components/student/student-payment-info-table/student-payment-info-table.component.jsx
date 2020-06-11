import React, { useState, useEffect } from 'react'
import { Table, Input, Button, Space, Dropdown, Menu, Tag } from 'antd'
import Highlighter from 'react-highlight-words'
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  getPaymentTrail,
  deleteUploadedPayment,
} from '../../../redux/payments/payments.actions'

import { fireAlertWithConfirmation } from '../../common/confirmation-message/confirmation-message.component'

const StudentPaymentInfoTable = ({
  paymentTrail,
  getPaymentTrail,
  deleteUploadedPayment,
  paymentId,
  setData,
  setModalVisible,
}) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  let searchInput

  useEffect(() => {
    if (paymentId) {
      getPaymentTrail(paymentId)
    }
  }, [paymentId, getPaymentTrail])

  const editPaymentDetails = (payment) => {
    setData(payment)
    setModalVisible(true)
  }

  const deletePaymentDetails = (payment) => {
    fireAlertWithConfirmation(
      'Are you sure you want to delete?',
      'Successfully deleted!',
      (confirmed) => {
        if (confirmed) {
          deleteUploadedPayment(payment)
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
      title: 'Payment ID',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Reference No.',
      dataIndex: 'referenceNo',
      key: 'referenceNo',
      ...getColumnSearchProps('referenceNo'),
    },
    {
      title: 'Payment Type',
      dataIndex: 'type',
      key: 'type',
      ...getColumnSearchProps('type'),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      ...getColumnSearchProps('amount'),
    },
    {
      title: 'Verified (?)',
      key: 'verified',
      dataIndex: 'verified',
      render: (verified) => {
        if (!verified) {
          return (
            <Tag color={'volcano'} key={verified}>
              NO
            </Tag>
          )
        } else {
          return (
            <Tag color={'green'} key={verified}>
              YES
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
                <Menu.Item onClick={() => editPaymentDetails(text)}>
                  <EditOutlined />
                  update payment
                </Menu.Item>
                <Menu.Item onClick={() => deletePaymentDetails(text)}>
                  <DeleteOutlined /> delete payment
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
      dataSource={paymentTrail ? paymentTrail : []}
      rowKey={(record) => record.id}
    />
  )
}

const mapStateToProps = (state, ownParams) => {
  return {
    paymentTrail: state.payments.paymentTrail,
    paymentId: ownParams.match.params.id,
  }
}

const mapDispatchToProps = {
  getPaymentTrail,
  deleteUploadedPayment,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StudentPaymentInfoTable)
)
