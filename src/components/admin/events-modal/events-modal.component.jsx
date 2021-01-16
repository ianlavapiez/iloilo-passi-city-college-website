import React, { useState } from 'react';
import { Modal, Button, Input, Form, DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import './events-modal.styles.scss';
import { addEvents, updateEvents } from '../../../redux/events/events.actions';
import { fireAlert } from '../../common/confirmation-message/confirmation-message.component';

const { TextArea } = Input;

const EventsModal = ({ events, edit, addEvents, updateEvents }) => {
  const [visible, setVisible] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [date, setDate] = useState('');

  const showModal = () => {
    setVisible(true);
  };

  const onFinish = async ({ event }) => {
    if (imageFile === null) {
      return fireAlert('Please upload your image.', 'warning');
    }

    let newData = {
      ...event,
      date,
    };

    if (!edit) {
      await addEvents(imageFile, newData);
    } else {
      let id = document.querySelector('.id').value;

      newData = {
        ...newData,
        id,
      };

      await updateEvents(imageFile, newData);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const validateMessages = {
    // eslint-disable-next-line
    required: '${label} is required!',
  };

  const onDateChange = (date, dateString) => {
    setDate(dateString);
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
        Add Event
      </Button>
      <Modal
        title={!edit ? 'Add Event' : 'Edit Event'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form validateMessages={validateMessages} onFinish={onFinish}>
          <Input
            type='hidden'
            readOnly
            value={!edit ? '' : events.id}
            name='id'
            className='id'
          />
          <Form.Item
            className='form-item'
            name={['event', 'eventName']}
            label='Event Name'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ width: '100%' }}
            className='form-item'
            name={['event', 'date']}
            label='Date'
            rules={[{ required: true }]}
          >
            <DatePicker onChange={onDateChange} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['event', 'description']}
            label='Description'
            rules={[{ required: true }]}
          >
            <TextArea />
          </Form.Item>
          {!showImageUpload && edit ? (
            <Form.Item className='formItemMargin'>
              <Button onClick={toggleImageUpload}>Re-upload Image</Button>
            </Form.Item>
          ) : (
            <Form.Item
              className='form-item'
              label='Upload Image'
              name={['event', 'event_image']}
              rules={[{ required: true }]}
            >
              <Input onChange={handleUploading} type='file' />
            </Form.Item>
          )}
          {edit && events.imageUrl && showImageUpload ? (
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
  addEvents,
  updateEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsModal);
