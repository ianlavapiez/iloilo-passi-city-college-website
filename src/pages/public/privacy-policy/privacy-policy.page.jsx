import React, { Fragment, useEffect } from 'react'

import PrivacyPolicy from '../../../components/public/privacy-policy/privacy-policy.component'
import Footer from '../../../components/public/footer/footer.component'

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>
      <div className='u-center-text'>
        <h2 className='heading-secondary u-margin-top-big'>
          Privacy Policy for Brainhub
        </h2>
      </div>
      <PrivacyPolicy />
      <Footer />
    </Fragment>
  )
}

export default PrivacyPolicyPage
