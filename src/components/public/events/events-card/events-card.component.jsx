import React from 'react';

const EventsCard = ({ events }) => {
  return (
    <section className='section-stories'>
      <div className='u-center-text u-margin-bottom-big'>
        <h2 className='heading-secondary'>Iloilo Passi City College Events</h2>
      </div>

      {events.map((event) => (
        <div className='row'>
          <div className='story'>
            <figure className='story__shape'>
              <img className='story__img' src={event.imageUrl} alt='Reviewer' />
              <figcaption className='story__caption'>
                {event.eventName}
              </figcaption>
            </figure>
            <div className='story__text'>
              <h3 className='heading-tertiary u-margin-bottom-small'>
                {event.eventName}
              </h3>
              <p className='paragraph-stories'>{event.date}</p>
              <p className='paragraph-stories'>{event.description}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default EventsCard;
