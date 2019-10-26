import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTechs } from '../../redux/actions/techActions';

const TechSelectOption = ({ techs, getTechs }) => {
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  return (
    techs.length > 0 &&
    techs.map(tech => (
      <option key={tech._id} value={`${tech.firstName} ${tech.lastName}`}>
        {tech.firstName} {tech.lastName}
      </option>
    ))
  );
};

TechSelectOption.propTypes = {
  techs: PropTypes.array.isRequired,
  getTechs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  techs: state.tech.techs
});

export default connect(
  mapStateToProps,
  { getTechs }
)(TechSelectOption);
