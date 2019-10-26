import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TechItem from './TechItem';

import { getTechs } from '../../redux/actions/techActions';

const TechListModal = ({ techs, getTechs }) => {
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Technician List</h4>
        <ul className='collection'>
          {techs.length > 0 &&
            techs.map(tech => <TechItem key={tech._id} tech={tech} />)}
        </ul>
      </div>
    </div>
  );
};

TechListModal.propsType = {
  techs: PropTypes.array.isRequired,
  getTechs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  techs: state.tech.techs
});

export default connect(
  mapStateToProps,
  { getTechs }
)(TechListModal);
