import React, { Fragment, useEffect } from 'react'

import Footer from '../../../components/public/footer/footer.component'
import FacilitiesCard from '../../../components/public/facilities/facilities.component'

import { facilitiesData } from '../../../data/public/facilities/facilities'

const FacilitiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>
      <main>
        <FacilitiesCard facilities={facilitiesData} />
      </main>
      <Footer />
    </Fragment>
  )
}

export default FacilitiesPage
