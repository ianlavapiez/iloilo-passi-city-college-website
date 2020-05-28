import React from 'react'

import ProgramCard from '../../../components/public/programs/program-card/program-card.component'

const programsArray = [
  {
    course: 'BSN',
    programs: ['Program 1', 'Program 2', 'Program 3', 'Program 4'],
    price: 'P5,000.00',
  },
  {
    course: 'BSMT',
    programs: ['Program 1', 'Program 2', 'Program 3', 'Program 4'],
    price: 'P55,000.00',
  },
  {
    course: 'BSD',
    programs: ['Program 1', 'Program 2', 'Program 3', 'Program 4'],
    price: 'P65,000.00',
  },
]

const ProgramsPage = () => {
  return (
    <section className='section-program'>
      <div className='u-center-text u-margin-bottom-small'>
        <h2 className='heading-secondary'>Programs Offered</h2>
      </div>

      <div className='row'>
        {programsArray.map((program) => {
          return (
            <ProgramCard
              programs={program.programs}
              course={program.course}
              price={program.price}
            />
          )
        })}
      </div>
    </section>
  )
}

export default ProgramsPage
