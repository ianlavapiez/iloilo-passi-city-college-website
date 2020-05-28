import React from 'react'

import GadgetImage from '../../../../assets/online-review/gadget.png'
import ZoomImage from '../../../../assets/online-review/zoom.jpg'
import ClassImage from '../../../../assets/online-review/class.png'

const Header = () => {
  return (
    <section className='section-about'>
      <div className='u-center-text u-margin-bottom-big'>
        <h2 className='heading-secondary'>Online Review Guidelines</h2>
      </div>

      <div className='row'>
        <div className='col-1-of-2'>
          <h3 className='heading-about u-margin-bottom-small'>New Norm</h3>
          <p className='paragraph'>
            Brainhub will do everything that is possible to bring review
            necessities at your home. With the use of the Internet, the online
            review classes will be conducted through a platform called{' '}
            <strong>Zoom</strong>. This platform will allow the students to see
            and interact with their professors virtually.
          </p>
          <h3 className='heading-about u-margin-bottom-small'>How it Works?</h3>
          <p className='paragraph'>
            The students need a laptop or a mobile phone that can install{' '}
            <strong>Zoom</strong>. Once the student has installed the
            application, the student will wait for the the Meeting ID and
            password to be given by the staff-in-charge of Brainhub.
          </p>
        </div>
        <div className='col-1-of-2'>
          <div className='composition'>
            <img
              src={GadgetImage}
              alt='Gadgets'
              className='composition__photo composition__photo--p1'
            />
            <img
              src={ClassImage}
              alt='Classroom'
              className='composition__photo composition__photo--p2'
            />
            <img
              src={ZoomImage}
              alt='Zoom'
              className='composition__photo composition__photo--p3'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header
