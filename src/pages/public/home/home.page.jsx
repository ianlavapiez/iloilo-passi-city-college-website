import React, { Fragment, useEffect } from 'react'

import Header from '../../../components/public/home/header/header.component'
import Footer from '../../../components/public/footer/footer.component'
import SectionAbout from '../../../components/public/home/section-about/section-about.component'
import SectionFeatures from '../../../components/public/home/section-features/section-features.component'
import SectionStories from '../../../components/public/home/section-stories/section-stories.component'

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>
      <Header />
      <main>
        <SectionAbout />
        <SectionFeatures />
        <SectionStories />
      </main>
      <Footer />
    </Fragment>
  )
}

export default HomePage
