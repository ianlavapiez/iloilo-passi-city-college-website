import React from 'react'
import { Link } from 'react-router-dom'

const ProgramCard = ({ course, programs, price }) => {
  return (
    <div className='col-1-of-3 u-margin-bottom-small'>
      <div className='card'>
        <div className='card__side card__side--front'>
          <div className='card__picture card__picture--1'>&nbsp;</div>
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
              <p className='card__price-only'>Price starts at</p>
              <p className='card__price-value'>{price}</p>
            </div>
            <Link to='/registration' className='btn btn--white'>
              Enroll now!
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgramCard
