import React, { useState } from 'react'
import { Table, Input, Button, Space, Menu, Dropdown } from 'antd'
import Highlighter from 'react-highlight-words'
import {
  SearchOutlined,
  CloseOutlined,
  MoreOutlined,
  CheckOutlined,
  PicCenterOutlined,
} from '@ant-design/icons'
import { connect } from 'react-redux'

import {
  verifyPaymentDetails,
  unVerifyPaymentDetails,
  updateAccumulatedPayment,
} from '../../../redux/payments/payments.actions'

import { fireAlertWithConfirmation } from '../../common/confirmation-message/confirmation-message.component'

const PaymentVerificationTable = ({
  paymentTrail,
  setModalVisible,
  setData,
  verifyPaymentDetails,
  updateAccumulatedPayment,
  payments,
}) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  let searchInput

  const verifyPayment = (payment) => {
    fireAlertWithConfirmation(
      'Are you sure you want to verify the selected payment?',
      'Successfully verified!',
      (confirmed) => {
        if (confirmed) {
          verifyPaymentDetails(payment)
        } else {
          return false
        }
      }
    )
  }

  const deletePayment = (payment) => {
    fireAlertWithConfirmation(
      'Are you sure you want to delete the selected payment? Once deleted, it cannot be undone!',
      'Successfully deleted!',
      async (confirmed) => {
        if (confirmed) {
          if (payments) {
            let specificPayment = payments.map((p) => p.id === payment.id)
            let accumulatedPayment =
              payments.accumulatedPayment - payment.amount
            let newUpdatedPayment = {
              id: specificPayment.paymentId,
              accumulatedPayment,
            }

            await unVerifyPaymentDetails(payment)
            await updateAccumulatedPayment(newUpdatedPayment)
          }
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

  const showDetails = (data) => {
    setModalVisible(true)
    setData(data)
  }

  const columns = [
    {
      title: 'Payment Trail ID',
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
      title: 'Reference No.',
      dataIndex: 'referenceNo',
      key: 'referenceNo',
      ...getColumnSearchProps('referenceNo'),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      ...getColumnSearchProps('type'),
    },
    {
      title: 'Payment Made',
      dataIndex: 'amount',
      key: 'amount',
      ...getColumnSearchProps('amount'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text) => (
        <span>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => showDetails(text)}>
                  <PicCenterOutlined /> check uploaded receipt
                </Menu.Item>
                <Menu.Item onClick={() => verifyPayment(text)}>
                  <CheckOutlined /> verify payment
                </Menu.Item>
                <Menu.Item onClick={() => deletePayment(text)}>
                  <CloseOutlined />
                  decline payment
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
      rowKey={(record) => record.id}
      dataSource={paymentTrail ? paymentTrail : []}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    paymentTrail: state.payments.unverifiedPaymentTrail,
    payments: state.payments.payments,
  }
}

const mapDispatchToProps = {
  verifyPaymentDetails,
  updateAccumulatedPayment,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentVerificationTable)
