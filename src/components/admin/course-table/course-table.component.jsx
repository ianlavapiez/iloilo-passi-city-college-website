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
  fetchCourse,
  softDeleteCourse,
} from '../../../redux/course/course.actions';

import { fireAlertWithConfirmation } from '../../common/confirmation-message/confirmation-message.component';

const CourseTable = ({
  courses,
  fetchCourse,
  setModalVisible,
  setData,
  softDeleteCourse,
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  let searchInput;

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

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
          softDeleteCourse(data);
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
      title: 'Course ID',
      dataIndex: 'id',
      key: 'id',
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Abbreviation',
      dataIndex: 'abbreviation',
      key: 'abbreviation',
      ...getColumnSearchProps('abbreviation'),
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
      ...getColumnSearchProps('courseName'),
    },
    {
      title: 'Course Length',
      dataIndex: 'courseLength',
      key: 'courseLength',
      ...getColumnSearchProps('courseLength'),
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
                  Update Course
                </Menu.Item>
                <Menu.Item onClick={() => deleteDetails(text)}>
                  <DeleteOutlined /> Delete Course
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
      dataSource={courses ? courses : []}
      rowKey={(record) => record.id}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses.courses,
  };
};

const mapDispatchToProps = {
  fetchCourse,
  softDeleteCourse,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CourseTable)
);
