import React from 'react'

import './contact-information.styles.scss'

const ContactInformation = () => {
  return (
    <section className='section-book u-margin-top-small u-margin-bottom-small'>
      <div className='row book'>
        <div className='col-1-of-2'>
          <div>
            <div className='book__form'>
              <form action='#' className='form'>
                <div className='u-margin-bottom-small'>
                  <h2 className='heading-secondary'>Send us a message</h2>
                </div>
                <div className='form__group'>
                  <input
                    id='name'
                    type='text'
                    className='form__input'
                    placeholder='Full name'
                    required
                  />
                  <label for='name' className='form__label'>
                    Full name
                  </label>
                </div>
                <div className='form__group'>
                  <input
                    id='address'
                    type='text'
                    className='form__input'
                    placeholder='Address'
                    required
                  />
                  <label for='address' className='form__label'>
                    Address
                  </label>
                </div>
                <div className='form__group'>
                  <textarea
                    id='message'
                    type='text'
                    className='form__input'
                    placeholder='Your message'
                    required
                  />
                  <label for='message' className='form__label'>
                    Your message
                  </label>
                </div>
                <div className='form__group'>
                  <button className='btn btn--orangered'>
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
              <div className='form'>
                <div className='u-margin-bottom-small'>
                  <h2 className='heading-secondary'>Contact Us</h2>
                </div>
                <h1 className='heading-primary-contact'>
                  <span className='heading-primary-contact--contact-main'>
                    Phone
                  </span>
                  <span className='heading-primary-contact--contact-sub'>
                    (033) 508-21-23
                  </span>
                  <span className='heading-primary-contact--contact-main'>
                    Email
                  </span>
                  <a
                    className='heading-primary-contact--contact-link'
                    href='mailto:idccnreviewcenter14@yahoo.com'
                  >
                    idccnreviewcenter14@yahoo.com
                  </a>
                  <span className='heading-primary-contact--contact-main'>
                    Messenger
                  </span>
                  <a
                    className='heading-primary-contact--contact-link'
                    href='https://www.messenger.com/t/1712108522174873'
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
  )
}

export default ContactInformation
