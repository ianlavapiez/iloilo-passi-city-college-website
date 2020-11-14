import React, { Fragment, useEffect } from 'react'

import Footer from '../../../components/public/footer/footer.component'
import EventsCard from '../../../components/public/events/events-card/events-card.component'

import { eventsData } from '../../../data/public/events/events'

const EventsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>
      <main>
        <EventsCard events={eventsData} />
      </main>
      <Footer />
    </Fragment>
  )
}

export default EventsPage
