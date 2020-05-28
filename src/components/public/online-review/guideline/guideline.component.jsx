import React from 'react'
import { Timeline } from 'antd'
import { Link } from 'react-router-dom'

const Guideline = () => {
  return (
    <section className='section-online-overview'>
      <div className='u-center-text u-margin-bottom-big'>
        <h2 className='heading-secondary'>How to Enroll?</h2>
      </div>
      <div className='row'>
        <div className='col-1-of-2'>
          <h3 className='heading-about u-margin-bottom-small'>Requirements</h3>
          <p className='paragraph'>
            On the right side, the student can easily review the steps on how to
            enroll and how will the online review works.
          </p>
          <h3 className='heading-about u-margin-bottom-small'>
            Have Questions?
          </h3>
          <p className='paragraph'>
            Don't hesitate to contact us through this link:{' '}
            <Link to='/contact'>Brainhub Contact Page</Link>.
          </p>
        </div>
        <div className='col-1-of-2'>
          <Timeline mode='alternate'>
            <Timeline.Item label='Step #1'>
              Register by going through{' '}
              <a href='https://brainhub.ph/registration'>
                brainhub.ph/registration
              </a>{' '}
              or through this <Link to='/registration'>link</Link>.
            </Timeline.Item>
            <Timeline.Item label='Step #2'>
              After registration, you need to make a downpayment depending on
              your course. The additional payment information is at the "
              <strong>Payments</strong>" tab when you logged in through this{' '}
              <Link to='/student/login'>link</Link>.
            </Timeline.Item>
            <Timeline.Item label='Step #3'>
              After payment, you will wait for a notification about your next
              class schedule. You can check it through the "
              <strong>Your Schedule</strong>" tab.
            </Timeline.Item>
            <Timeline.Item label='Step #4'>
              Once you have a schedule, you will receive an e-mail notification
              on what time will your online review will start and at the same
              time the <strong>Brainhub Management</strong> will give you the
              unique <strong>Meeting ID</strong> and <strong>Password</strong>{' '}
              to use in <strong>Zoom</strong>.
            </Timeline.Item>
          </Timeline>
        </div>
      </div>
    </section>
  )
}

export default Guideline
