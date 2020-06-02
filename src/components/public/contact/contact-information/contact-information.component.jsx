import React from 'react'
import { Spin } from 'antd'
import { PhoneFilled, MailFilled, FacebookFilled } from '@ant-design/icons'
import { connect } from 'react-redux'

import './contact-information.styles.scss'

import { addMessage } from '../../../../redux/public-messaging/public-messaging.actions'

import useInput from '../use-input/use-input.component'
import { fireAlert } from '../../../common/confirmation-message/confirmation-message.component'

const ContactInformation = ({ addMessage, loading }) => {
  const [fullname, setFullname, fullnameInput] = useInput({
    type: 'text',
    name: 'fullname',
    label: 'Fullname',
  })
  const [address, setAddress, addressInput] = useInput({
    type: 'text',
    name: 'address',
    label: 'Address',
  })
  const [contact, setContact, contactInput] = useInput({
    type: 'text',
    name: 'contact',
    label: 'Contact',
  })
  const [message, setMessage, messageInput] = useInput({
    type: 'text',
    name: 'message',
    label: 'Message',
  })

  const clearFields = () => {
    setFullname('')
    setAddress('')
    setContact('')
    setMessage('')
  }

  const onMessageSubmit = async (event) => {
    event.preventDefault()

    if (!fullname || !address || !contact || !message) {
      fireAlert('Fill in all fields!', 'warning')
    } else {
      const data = { fullname, address, contact, message }

      await addMessage(data)
      clearFields()
    }
  }

  return (
    <Spin spinning={loading} delay={500}>
      <section className='section-book u-margin-top-small u-margin-bottom-medium'>
        <div className='row book'>
          <div className='col-1-of-2'>
            <div>
              <div className='book__form'>
                <form action='#' className='form'>
                  <div className='u-margin-bottom-small'>
                    <h2 className='heading-secondary'>Send us a message</h2>
                  </div>
                  {fullnameInput}
                  {addressInput}
                  {contactInput}
                  {messageInput}
                  <div className='form__group'>
                    <button
                      onClick={onMessageSubmit}
                      className='btn btn--orangered'
                    >
                      Send Message &rarr;
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='col-1-of-2'>
            <div>
              <div className='book__form'>
                <div>
                  <div className='u-margin-bottom-small contact-upper'>
                    <h2 className='heading-secondary-contact'>Contact Us</h2>
                  </div>
                  <h1 className='heading-primary-contact'>
                    <PhoneFilled style={{ fontSize: 50, color: '#ffb900' }} />
                    <span className='heading-primary-contact--contact-sub'>
                      (033) 508-21-23
                    </span>
                    <span className='heading-primary-contact--contact-sub'>
                      (Globe) 0917-308-6308
                    </span>
                    <span className='heading-primary-contact--contact-sub'>
                      (Smart) 0999-961-5941
                    </span>
                  </h1>
                  <h1 className='heading-primary-contact'>
                    <MailFilled style={{ fontSize: 50, color: '#ffb900' }} />
                    <a
                      className='heading-primary-contact--contact-link'
                      href='mailto:idccnreviewcenter14@yahoo.com'
                    >
                      idccnreviewcenter14@yahoo.com
                    </a>
                  </h1>
                  <h1 className='heading-primary-contact'>
                    <FacebookFilled
                      style={{ fontSize: 50, color: '#ffb900' }}
                    />
                    <a
                      className='heading-primary-contact--contact-link'
                      href='https://www.facebook.com/Brainhub-Review-Specialist-1712108522174873/'
                    >
                      Brainhub Review Specialist
                    </a>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Spin>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.async.loading,
  }
}

const mapDispatchToProps = {
  addMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactInformation)
