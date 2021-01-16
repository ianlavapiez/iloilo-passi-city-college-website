import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import './facilities-modal.styles.scss';

import {
  addFacility,
  updateFacility,
} from '../../../redux/facilities/facilities.actions';
import { fireAlert } from '../../common/confirmation-message/confirmation-message.component';

const FacilitiesModal = ({
  facilities,
  edit,
  addFacility,
  updateFacility,
  loading,
  setEdit,
  setVisible,
  visible,
}) => {
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
      await addFacility(imageFile, facility);
    } else {
      let id = document.querySelector('.id').value;
      let newData = {
        ...facility,
        id,
      };

      await updateFacility(imageFile, newData);
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setEdit(false);
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
            initialValue={!edit ? '' : facilities.facilityName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['facility', 'description']}
            label='Description'
            rules={[{ required: true }]}
            initialValue={!edit ? '' : facilities.description}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['facility', 'usage']}
            label='Usage'
            rules={[{ required: true }]}
            initialValue={!edit ? '' : facilities.usage}
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
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button
              loading={loading}
              style={{
                borderRadius: 5,
                backgroundColor: '#f97204',
                border: 'none',
              }}
              type='primary'
              htmlType='submit'
            >
              Submit
            </Button>
          </Form.Item>
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
  addFacility,
  updateFacility,
};

export default connect(mapStateToProps, mapDispatchToProps)(FacilitiesModal);
