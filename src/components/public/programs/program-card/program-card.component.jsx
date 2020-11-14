import React from 'react'

const ProgramCard = ({ course, programs, imageId }) => {
  const pictureClass = `card__picture card__picture--${imageId}`

  return (
    <div className='col-1-of-3 u-margin-bottom-small'>
      <div className='card'>
        <div className='card__side card__side--front'>
          <div className={pictureClass}>&nbsp;</div>
          <h4 className='card__heading'>
            <span className='card__heading-span card__heading-span--1'>
              {course}
            </span>
          </h4>
          <div className='card__details'>
            <ul>
              {programs.map((program) => (
                <li key={program}>{program}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='card__side card__side--back card__side--back-1'>
          <div className='card__cta'>
            <div className='card__price-box'>
              <p className='card__price-only'>Interested on our courses?</p>
            </div>
            <div className='card__price-box'>
              <p className='card__price-only'>Enroll Now!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramCard
