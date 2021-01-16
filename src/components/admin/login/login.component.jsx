import React from 'react';
import { Form, Input, Button, Typography, Layout } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './login.styles.scss';
import { fireAlert } from '../../common/confirmation-message/confirmation-message.component';
import { authenticatedTrue } from '../../../redux/authenticated/authenticated.actions';

const { Title } = Typography;
const { Content } = Layout;

const LoginForm = ({ history, authenticatedTrue }) => {
  const onFinish = async (values) => {
    const { email, password } = values;

    if (email === 'admin@gmail.com' && password === '1234567890') {
      authenticatedTrue();
      fireAlert('Welcome Admin!', 'success');
      history.push('/admin/courses');
    } else {
      fireAlert('Incorrect email or password!', 'error');
    }
  };

  return (
    <Content className='login-container'>
      <Title level={2} style={{ fontWeight: 300 }}>
        Welcome Admin!
      </Title>
      <Form
        name='normal_login'
        className='login-form'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item>
          <Button
            size='large'
            style={{
              borderRadius: 5,
              backgroundColor: '#f97204',
              border: 'none',
            }}
            type='primary'
            htmlType='submit'
            className='login-form-button'
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

const mapDispatchToProps = {
  authenticatedTrue,
};

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));
