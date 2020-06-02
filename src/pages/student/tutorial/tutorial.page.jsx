import React from 'react'
import { Layout, Timeline, Typography } from 'antd'

import Sidebar from '../../../components/student/sidebar/sidebar.component'
import Navbar from '../../../components/student/navbar/navbar.component'
import StudentFooter from '../../../components/student/footer/footer.component'

import RegistrationImage from '../../../assets/student/zoom-signup.png'
import DownloadImage from '../../../assets/student/zoom-download.png'
import LoginImage from '../../../assets/student/login.png'
import MeetingImage from '../../../assets/student/meeting.png'

const { Content } = Layout
const { Title } = Typography

const TutorialPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar number={'4'} />
      <Layout className='site-layout'>
        <Navbar />
        <Content style={{ margin: '0 16px' }}>
          <div
            className='site-layout-background'
            style={{ padding: 20, minHeight: '85vh' }}
          >
            <Title style={{ marginBottom: 40 }} level={2}>
              Tutorials Overview
            </Title>
            <Timeline>
              <Timeline.Item color='green'>
                <Title level={4}>First Step</Title>
                <p>
                  Register an account through{' '}
                  <a href='https://zoom.us/freesignup' target='popup'>
                    Zoom Signup
                  </a>
                  .
                </p>
                <p>
                  <img
                    style={{ width: '70%' }}
                    src={RegistrationImage}
                    alt='Zoom Registration'
                  />
                </p>
              </Timeline.Item>
              <Timeline.Item color='green'>
                <Title level={4}>Second Step</Title>
                <p>
                  Download Zoom through{' '}
                  <a href='https://zoom.us/download' target='popup'>
                    Zoom Download
                  </a>
                  . You can select based on your system OS (e.g. Mac OS,
                  Windows, or Linux).
                </p>
                <p>
                  <img
                    style={{ width: '70%' }}
                    src={DownloadImage}
                    alt='Zoom Download'
                  />
                </p>
              </Timeline.Item>
              <Timeline.Item color='green'>
                <Title level={4}>Third Step</Title>
                <p>Login your account using your registered credentials.</p>
                <p>
                  <img
                    style={{ width: '70%' }}
                    src={LoginImage}
                    alt='Zoom Download'
                  />
                </p>
              </Timeline.Item>
              <Timeline.Item color='green'>
                <Title level={4}>Fourth Step</Title>
                <p>
                  Wait for the Brainhub personnel to notify you with the Meeting
                  ID and password.
                </p>
                <p>
                  Type in the Meeting ID and password, then wait for Zoom to
                  load you to the virtual class.
                </p>
                <p>
                  <img
                    style={{ width: '70%' }}
                    src={MeetingImage}
                    alt='Zoom Download'
                  />
                </p>
              </Timeline.Item>
            </Timeline>
          </div>
        </Content>
        <StudentFooter />
      </Layout>
    </Layout>
  )
}

export default TutorialPage
