import React, { Fragment, useEffect } from 'react'

import Header from '../../../components/public/online-review/header/header.component'
import Guideline from '../../../components/public/online-review/guideline/guideline.component'

const OnlineReviewPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>
      <Header />
      <Guideline />
    </Fragment>
  )
}

export default OnlineReviewPage
