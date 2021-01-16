import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Footer from '../../../components/public/footer/footer.component';
import FacilitiesCard from '../../../components/public/facilities/facilities.component';
import { fetchFacilities } from '../../../redux/facilities/facilities.actions';

const FacilitiesPage = ({ facilities, fetchFacilities }) => {
  useEffect(() => {
    window.scrollTo(0, 0);

    fetchFacilities();
  }, [fetchFacilities]);

  return (
    <Fragment>
      <main>
        <FacilitiesCard facilities={facilities && facilities} />
      </main>
      <Footer />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    facilities: state.facilities.facilities,
  };
};

const mapDispatchToProps = {
  fetchFacilities,
};

export default connect(mapStateToProps, mapDispatchToProps)(FacilitiesPage);
