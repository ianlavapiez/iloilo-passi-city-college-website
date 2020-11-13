import React from 'react'

import FirstImage from '../../../../assets/about-first.jpg'
import SecondImage from '../../../../assets/about-second.jpg'
import ThirdImage from '../../../../assets/about-third.jpg'

const SectionAbout = () => {
  return (
    <section className='section-about'>
      <div className='u-center-text u-margin-bottom-big'>
        <h2 className='heading-secondary'>Our History</h2>
      </div>

      <div className='row'>
        <div className='col-1-of-2'>
          <h3 className='heading-about u-margin-bottom-small'>
            The Heart of Panay
          </h3>
          <p className='paragraph'>
            Convinced of the Passi City’s location, which is at the heart of
            Panay, and fervently desirous to uplift the citys economic status
            through its youth, on November 5, 2004, Passi City Mayor Elyzer C.
            Chavez and his Sangguniang Panglungsod (SP) Members particularly the
            chairman of the committee on education SP Member Basilio Ligasan
            Jr., through the wisdom and the linkages of Helmar E. Aguilar, Ed.
            D., President Emeritus, Aklan State University and Passi City
            College Consultant with the effort and expertise of Rodolfo L.
            Leonor, Ph. D., Education Supervisor I of the Division of Passi
            City, at the same time Acting College Dean, conceived the foundation
            of the Passi City College A Brave Step in Providing Quality Tertiary
            Education for a Better Tomorrow.
          </p>
          <h3 className='heading-about u-margin-bottom-small'>
            How Passi City College was organized
          </h3>
          <p className='paragraph'>
            A committee was organized to conduct a feasibility study for the
            creation of Passi City College. This was chaired by Helmar E.
            Aguilar, Ed. D., co-chaired by Rodolfo L. Leonor, Ph.D. and with
            members Dr. Defralino Ruiz, Budget Officer, Aklan State University
            and Dr. Regina Clavel, Researcher and Statistician, Iloilo State
            College of Fisheries Dingle Campus.
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
