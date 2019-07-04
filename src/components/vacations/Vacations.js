import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import differenceBy from 'lodash.differenceby';
import VacationItem from './VacationItem';
import {
  getVacations,
  getVacationsfollowedByUser
} from '../../actions/vacation';

const Vacations = ({
  getVacations,
  getVacationsfollowedByUser,
  vacation: { vacations, vacationsFollowedByUser, loading }
}) => {
  useEffect(() => {
    getVacations();
    getVacationsfollowedByUser();
  }, [getVacations, getVacationsfollowedByUser]);

  const vacationsNotFollowed = differenceBy(
    vacations,
    vacationsFollowedByUser,
    'id'
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Vacations</h1>
      <p className='lead'>View all vacations</p>
      <div className='vacations'>
        {vacationsFollowedByUser.map(vacation => (
          <VacationItem key={vacation.id} vacation={vacation} />
        ))}
        {vacationsNotFollowed.map(vacation => (
          <VacationItem key={vacation.id} vacation={vacation} />
        ))}
      </div>
    </Fragment>
  );
};

Vacations.propTypes = {
  getVacations: PropTypes.func.isRequired,
  vacation: PropTypes.object.isRequired,
  getVacationsfollowedByUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  vacation: state.vacation
});

export default connect(
  mapStateToProps,
  { getVacations, getVacationsfollowedByUser }
)(Vacations);
