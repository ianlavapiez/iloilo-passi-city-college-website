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
  fetchEvents,
  softDeleteEvent,
} from '../../../redux/events/events.actions';

import { fireAlertWithConfirmation } from '../../common/confirmation-message/confirmation-message.component';

const EventsTable = ({
  events,
  fetchEvents,
  setModalVisible,
  setData,
  softDeleteEvent,
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  let searchInput;

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

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
          softDeleteEvent(data);
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
      title: 'Event ID',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Event Name',
      dataIndex: 'eventName',
      key: 'eventName',
      ...getColumnSearchProps('eventName'),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      ...getColumnSearchProps('date'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description'),
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
                  Update Event
                </Menu.Item>
                <Menu.Item onClick={() => deleteDetails(text)}>
                  <DeleteOutlined /> Delete Event
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
      dataSource={events ? events : []}
      rowKey={(record) => record.id}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
  };
};

const mapDispatchToProps = {
  fetchEvents,
  softDeleteEvent,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EventsTable)
);
