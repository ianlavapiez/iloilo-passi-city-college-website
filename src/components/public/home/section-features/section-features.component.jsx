import React from 'react'

const SectionFeatures = () => {
  return (
    <section className='section-features'>
      <div className='u-center-text u-margin-bottom-big'>
        <h2 className='heading-features'>Mission and Vision</h2>
      </div>
      <div className='row'>
        <div className='col-2-of-4'>
          <div className='feature-box'>
            <i className='feature-box__icon icon-basic-eye'></i>
            <h3 className='heading-tertiary u-margin-bottom-small'>Vision</h3>
            <p className='feature-box__text'>
              A center of academic excellence for sustainable development and
              societal transformation.
            </p>
          </div>
        </div>

        <div className='col-2-of-4'>
          <div className='feature-box'>
            <i className='feature-box__icon icon-basic-cup'></i>
            <h3 className='heading-tertiary u-margin-bottom-small'>Mission</h3>
            <p className='feature-box__text'>
              Committed to produce globally competent graduates who are
              well-equipped with relevant scientific , academic and
              technological knowledge, skills and values which enable them to
              become productive citizens and collaborators for social change.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionFeatures
