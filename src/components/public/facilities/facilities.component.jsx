import React from 'react';

const FacilitiesCard = ({ facilities }) => {
  return (
    <section className='section-about'>
      <div className='u-center-text u-margin-bottom-big'>
        <h2 className='heading-secondary'>Available Facilities</h2>
      </div>

      {facilities.map((facility) => (
        <div className='row' key={facility.id}>
          <div className='col-1-of-2'>
            <h3 className='heading-about u-margin-bottom-small'>
              {facility.facilityName}
            </h3>
            <p className='paragraph'>{facility.description}</p>
            <h3 className='heading-about u-margin-bottom-small'>Usage</h3>
            <p className='paragraph'>{facility.usage}</p>
          </div>
          <div className='col-1-of-2'>
            <div className='composition'>
              <img
                style={{ height: 300, width: 500 }}
                src={facility.imageUrl}
                alt='About 1'
                className='composition__photo composition__photo--p1'
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FacilitiesCard;
