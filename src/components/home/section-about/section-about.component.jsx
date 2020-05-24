import React from 'react'

import FirstImage from '../../../assets/about-first.png'
import SecondImage from '../../../assets/about-second.png'
import ThirdImage from '../../../assets/about-third.png'

const SectionAbout = () => {
  return (
    <section className='section-about'>
      <div className='u-center-text u-margin-bottom-big'>
        <h2 className='heading-secondary'>Our track record says it all...</h2>
      </div>

      <div className='row'>
        <div className='col-1-of-2'>
          <h3 className='heading-about u-margin-bottom-small'>
            #CleverMindsTrustBrainhub
          </h3>
          <p className='paragraph'>
            Brainhub's very own track record for the past nursing licensure
            exams reflects more of our credibility as to why we are the most
            trusted of students and the reason why we have become the number one
            review center in the region!
          </p>
          <h3 className='heading-about u-margin-bottom-small'>
            #ChooseQuality
          </h3>
          <p className='paragraph'>
            Join us as we turn more dreams into reality again this upcoming
            November 2020 NLE. We are looking forward to see you.
          </p>
        </div>
        <div className='col-1-of-2'>
          <div className='composition'>
            <img
              src={FirstImage}
              alt='About 1'
              className='composition__photo composition__photo--p1'
            />
            <img
              src={SecondImage}
              alt='About 2'
              className='composition__photo composition__photo--p2'
            />
            <img
              src={ThirdImage}
              alt='About 3'
              className='composition__photo composition__photo--p3'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionAbout
