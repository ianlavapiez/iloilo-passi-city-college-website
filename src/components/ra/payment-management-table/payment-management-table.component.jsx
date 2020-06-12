import React, { useState } from 'react'
import { Table, Input, Button, Space, Menu, Dropdown } from 'antd'
import Highlighter from 'react-highlight-words'
import { withRouter } from 'react-router-dom'
import {
  SearchOutlined,
  InfoCircleOutlined,
  DeleteOutlined,
  MoreOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { connect } from 'react-redux'

import { deletePayment } from '../../../redux/payments/payments.actions'
import { fireAlertWithConfirmation } from '../../common/confirmation-message/confirmation-message.component'

const PaymentManagementTable = ({
  deletePayment,
  payments,
  history,
  setData,
  setEdit,
  setModalVisible,
}) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  let searchInput

  const editPaymentDetails = (payment) => {
    setData(payment)
    setEdit(true)
    setModalVisible(true)
  }

  const deletePaymentDetails = (payment) => {
    fireAlertWithConfirmation(
      'Are you sure you want to delete?',
      'Successfully deleted!',
      (confirmed) => {
        if (confirmed) {
          deletePayment(payment)
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
      title: 'Action',
      key: 'action',
      render: (text) => (
        <span>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  onClick={() => history.push(`/ra/accounting/${text.id}`)}
                >
                  <InfoCircleOutlined /> info
                </Menu.Item>
                <Menu.Item onClick={() => editPaymentDetails(text)}>
                  <EditOutlined />
                  update payment
                </Menu.Item>
                <Menu.Item onClick={() => deletePaymentDetails(text)}>
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
      dataSource={payments ? payments : []}
      rowKey={(record) => record.id}
    />
  )
}

const mapStateToProps = (state) => {
  return {
    payments: state.payments.payments,
  }
}

const mapDispatchToProps = {
  deletePayment,
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PaymentManagementTable)
)
