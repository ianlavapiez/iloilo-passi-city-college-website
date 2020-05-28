import React, { Fragment, useEffect } from 'react'

import Header from '../../../components/public/contact/header/header.component'
import ContactInformation from '../../../components/public/contact/contact-information/contact-information.component'
import Footer from '../../../components/public/footer/footer.component'

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>
      <Header />
      <ContactInformation />
      <Footer />
    </Fragment>
  )
}

export default ContactPage
