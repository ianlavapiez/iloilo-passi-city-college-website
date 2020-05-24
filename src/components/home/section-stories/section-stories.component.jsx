import React from 'react'
import { Link } from 'react-router-dom'

import FirstImage from '../../../assets/stories/alayssa.png'
import SecondImage from '../../../assets/stories/sanie.png'

import VideoMp4 from '../../../assets/video.mp4'
import VideoWebm from '../../../assets/video.webm'

const SectionStories = () => {
  return (
    <section className='section-stories'>
      <div className='bg-video'>
        <video className='bg-video__content' autoPlay muted loop>
          <source src={VideoMp4} type='video/mp4' />
          <source src={VideoWebm} type='video/webm' />
          Your browser is not supported!
        </video>
      </div>
      <div className='u-center-text u-margin-bottom-big'>
        <h2 className='heading-secondary'>Success stories</h2>
      </div>

      <div className='row'>
        <div className='story'>
          <figure className='story__shape'>
            <img className='story__img' src={FirstImage} alt='Reviewer' />
            <figcaption className='story__caption'>Alayssa Mae</figcaption>
          </figure>
          <div className='story__text'>
            <h3 className='heading-tertiary u-margin-bottom-small'>
              Alayssa Mae S. Villan, RN
            </h3>
            <p className='paragraph-stories'>
              "Brainhub Family has given us so much this past 6 months. They've
              given us the support, emotional and spiritual; provided us with
              best lectures; and most of all, they've comforted us during our
              hardest times. They never made us feel that we were left out just
              because we come from somewhere else, And for that, I am very very
              thankful to be part of this family."
            </p>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='story'>
          <figure className='story__shape'>
            <img className='story__img' src={SecondImage} alt='Reviewer' />
            <figcaption className='story__caption'>Sanie Rose</figcaption>
          </figure>
          <div className='story__text'>
            <h3 className='heading-tertiary u-margin-bottom-small'>
              Sanie Rose C. Turita, RN
            </h3>
            <p className='paragraph-stories'>
              "I'm truly honor to be part of Brainhub family despite of all the
              struggles and difficulties I had, Brainhub had guided me to be
              strong and continue the battle ahead of me, to answer the calling
              to become a Registered Nurse! Thank you Brainhub and God bless!"
            </p>
          </div>
        </div>
      </div>

      <div className='u-center-text u-margin-top-huge'>
        <Link to='/stories' className='btn-text'>
          Read all stories &rarr;
        </Link>
      </div>
    </section>
  )
}

export default SectionStories
