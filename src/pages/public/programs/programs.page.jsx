import React, { Fragment, useEffect } from 'react';
import ProgramCard from '../../../components/public/programs/program-card/program-card.component';
import Footer from '../../../components/public/footer/footer.component';
import { fetchCourse } from '../../../redux/course/course.actions';
import { connect } from 'react-redux';

const ProgramsPage = ({ courses, fetchCourse }) => {
  useEffect(() => {
    window.scrollTo(0, 0);

    fetchCourse();
  }, [fetchCourse]);

  return (
    <Fragment>
      <section className='section-program'>
        <div className='u-center-text u-margin-bottom-small'>
          <h2 className='heading-secondary'>Courses Offered</h2>
        </div>

        <div className='row'>
          {courses && courses.length <= 3
            ? courses.map((program) => {
                return (
                  <ProgramCard
                    key={program.id}
                    programs={program.description}
                    course={program.abbreviation}
                    imageId={program.imageUrl}
                  />
                );
              })
            : null}
        </div>
        <div className='row'>
          {courses && courses.length <= 6
            ? courses.slice(3, 5).map((program) => {
                return (
                  <ProgramCard
                    key={program.id}
                    programs={program.description}
                    course={program.abbreviation}
                    imageId={program.imageUrl}
                  />
                );
              })
            : null}
        </div>
        <div className='row'>
          {courses && courses.length <= 9
            ? courses.slice(5, 8).map((program) => {
                return (
                  <ProgramCard
                    key={program.id}
                    programs={program.description}
                    course={program.abbreviation}
                    imageId={program.imageUrl}
                  />
                );
              })
            : null}
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses.courses,
  };
};

const mapDispatchToProps = {
  fetchCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgramsPage);
