import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import './course-modal.styles.scss';

import {
  addFacilities,
  updateFacilities,
} from '../../../redux/facilities/facilities.actions';
import { fireAlert } from '../../common/confirmation-message/confirmation-message.component';

const FacilitiesModal = ({
  facilities,
  edit,
  addFacilities,
  updateFacilities,
}) => {
  const [visible, setVisible] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const showModal = () => {
    setVisible(true);
  };

  const onFinish = async ({ facility }) => {
    if (imageFile === null) {
      return fireAlert('Please upload your image.', 'warning');
    }

    if (!edit) {
      await addFacilities(imageFile, facility);
    } else {
      let id = document.querySelector('.id').value;
      let newData = {
        ...facility,
        id,
      };

      await updateFacilities(imageFile, newData);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const validateMessages = {
    // eslint-disable-next-line
    required: '${label} is required!',
  };

  const toggleImageUpload = () => setShowImageUpload(!showImageUpload);

  const handleUploading = async (e) => {
    const imageFile = e.target.files[0];

    setImageFile(imageFile);
  };

  return (
    <div>
      <Button
        style={{ borderRadius: 5, backgroundColor: '#f97204', border: 'none' }}
        type='primary'
        onClick={showModal}
        icon={<CalendarOutlined />}
      >
        Add Facility
      </Button>
      <Modal
        title={!edit ? 'Add Facility' : 'Edit Facility'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form validateMessages={validateMessages} onFinish={onFinish}>
          <Input
            type='hidden'
            readOnly
            value={!edit ? '' : facilities.id}
            name='id'
            className='id'
          />
          <Form.Item
            className='form-item'
            name={['facility', 'facilityName']}
            label='Facility Name'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['facility', 'description']}
            label='Description'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['facility', 'usage']}
            label='Usage'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          {!showImageUpload && edit ? (
            <Form.Item className='formItemMargin'>
              <Button onClick={toggleImageUpload}>Re-upload Image</Button>
            </Form.Item>
          ) : (
            <Form.Item
              className='form-item'
              label='Upload Image'
              name={['facility', 'facility_image']}
              rules={[{ required: true }]}
            >
              <Input onChange={handleUploading} type='file' />
            </Form.Item>
          )}
          {edit && facilities.imageUrl && showImageUpload ? (
            <Form.Item className='formItemMargin'>
              <Button onClick={toggleImageUpload}>Cancel Re-upload</Button>
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.async.loading,
  };
};

const mapDispatchToProps = {
  addFacilities,
  updateFacilities,
};

export default connect(mapStateToProps, mapDispatchToProps)(FacilitiesModal);
