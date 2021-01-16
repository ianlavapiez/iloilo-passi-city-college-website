import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../../../components/public/footer/footer.component';
import EventsCard from '../../../components/public/events/events-card/events-card.component';
import { fetchEvents } from '../../../redux/events/events.actions';

const EventsPage = ({ events, fetchEvents }) => {
  useEffect(() => {
    window.scrollTo(0, 0);

    fetchEvents();
  }, [fetchEvents]);

  return (
    <Fragment>
      <main>
        <EventsCard events={events && events} />
      </main>
      <Footer />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.events.events,
  };
};

const mapDispatchToProps = {
  fetchEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsPage);
