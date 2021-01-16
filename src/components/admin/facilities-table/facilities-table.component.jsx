import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Dropdown, Menu } from 'antd';
import Highlighter from 'react-highlight-words';
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  fetchFacilities,
  softDeleteFacility,
} from '../../../redux/facilities/facilities.actions';

import { fireAlertWithConfirmation } from '../../common/confirmation-message/confirmation-message.component';

const FacilitiesTable = ({
  facilities,
  fetchFacilities,
  setModalVisible,
  setData,
  softDeleteFacility,
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  let searchInput;

  useEffect(() => {
    fetchFacilities();
  }, [fetchFacilities]);

  const editDetails = (data) => {
    setData(data);
    setModalVisible(true);
  };

  const deleteDetails = (data) => {
    fireAlertWithConfirmation(
      'Are you sure you want to delete?',
      'Successfully deleted!',
      (confirmed) => {
        if (confirmed) {
          softDeleteFacility(data);
        } else {
          return false;
        }
      }
    );
  };

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
            searchInput = node;
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
        setTimeout(() => searchInput.select());
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
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'Facility ID',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Facility Name',
      dataIndex: 'facilityName',
      key: 'facilityName',
      ...getColumnSearchProps('facilityName'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description'),
    },
    {
      title: 'Usage',
      dataIndex: 'usage',
      key: 'usage',
      ...getColumnSearchProps('usage'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text) => (
        <span>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => editDetails(text)}>
                  <EditOutlined />
                  Update Facility
                </Menu.Item>
                <Menu.Item onClick={() => deleteDetails(text)}>
                  <DeleteOutlined /> Delete Facility
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
  ];

  return (
    <Table
      columns={columns}
      dataSource={facilities ? facilities : []}
      rowKey={(record) => record.id}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    facilities: state.facilities.facilities,
  };
};

const mapDispatchToProps = {
  fetchFacilities,
  softDeleteFacility,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FacilitiesTable)
);
