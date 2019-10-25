import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTechs } from '../../redux/actions/teachActions';

const TechSelectOption = ({ tech: { techs }, getTechs }) => {
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  return (
    techs.length > 0 &&
    techs.map(tech => (
      <option key={tech.id} value={`${tech.firstName} ${tech.lastName}`}>
        {tech.firstName} {tech.lastName}
      </option>
    ))
  );
};

TechSelectOption.propTypes = {
  techs: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  tech: state.tech
});

export default connect(
  mapStateToProps,
  { getTechs }
)(TechSelectOption);
