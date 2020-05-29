import React, { Fragment, useEffect } from 'react'

import ProgramCard from '../../../components/public/programs/program-card/program-card.component'
import Footer from '../../../components/public/footer/footer.component'

import {
  programsOne,
  programsTwo,
} from '../../../data/public/programs/programs'

const ProgramsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Fragment>
      <section className='section-program'>
        <div className='u-center-text u-margin-bottom-small'>
          <h2 className='heading-secondary'>Programs Offered</h2>
        </div>

        <div className='row'>
          {programsOne.map((program) => {
            return (
              <ProgramCard
                key={program.course}
                programs={program.programs}
                course={program.course}
                price={program.price}
                imageId={program.imageId}
              />
            )
          })}
        </div>
        <div className='row'>
          {programsTwo.map((program) => {
            return (
              <ProgramCard
                key={program.course}
                programs={program.programs}
                course={program.course}
                price={program.price}
                imageId={program.imageId}
              />
            )
          })}
        </div>
      </section>
      <Footer />
    </Fragment>
  )
}

export default ProgramsPage
