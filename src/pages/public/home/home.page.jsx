import React, { Fragment } from 'react'

import Header from '../../../components/home/header/header.component'
import Footer from '../../../components/common/footer/footer.component'
import SectionAbout from '../../../components/home/section-about/section-about.component'
import SectionFeatures from '../../../components/home/section-features/section-features.component'
import SectionStories from '../../../components/home/section-stories/section-stories.component'

const HomePage = () => {
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
