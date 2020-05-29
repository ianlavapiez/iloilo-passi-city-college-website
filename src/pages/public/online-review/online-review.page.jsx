import React, { Fragment, useEffect } from 'react'

import Header from '../../../components/public/online-review/header/header.component'
import Guideline from '../../../components/public/online-review/guideline/guideline.component'
import Footer from '../../../components/public/footer/footer.component'

const OnlineReviewPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>
      <Header />
      <Guideline />
      <Footer />
    </Fragment>
  )
}

export default OnlineReviewPage
