import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import './course-modal.styles.scss';
import { addCourse, updateCourse } from '../../../redux/course/course.actions';
import { fireAlert } from '../../common/confirmation-message/confirmation-message.component';

const CourseModal = ({ course, edit, addCourse, updateCourse }) => {
  const [visible, setVisible] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const showModal = () => {
    setVisible(true);
  };

  const onFinish = async ({ course }) => {
    if (imageFile === null) {
      return fireAlert('Please upload your image.', 'warning');
    }

    if (!edit) {
      await addCourse(imageFile, course);
    } else {
      let id = document.querySelector('.id').value;
      let newData = {
        ...course,
        id,
      };

      await updateCourse(imageFile, newData);
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
        Add Course
      </Button>
      <Modal
        title={!edit ? 'Add Course' : 'Edit Course'}
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form validateMessages={validateMessages} onFinish={onFinish}>
          <Input
            type='hidden'
            readOnly
            value={!edit ? '' : course.id}
            name='id'
            className='id'
          />
          <Form.Item
            className='form-item'
            name={['course', 'abbreviation']}
            label='Abbreviation (i.e., BSBA, BSIT)'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['course', 'courseName']}
            label='Course Name'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['course', 'courseLength']}
            label='Course Length'
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className='form-item'
            name={['course', 'description']}
            label='Description'
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
              name={['course', 'course_image']}
              rules={[{ required: true }]}
            >
              <Input onChange={handleUploading} type='file' />
            </Form.Item>
          )}
          {edit && course.imageUrl && showImageUpload ? (
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
  addCourse,
  updateCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseModal);
