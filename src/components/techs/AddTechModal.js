import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addTech } from '../../redux/actions/teachActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddTechModal = ({ addTech }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onSubmit = () => {
    if (firstName === '' || lastName === '') {
      M.toast({ html: 'Please enter the first and last name' });
    } else {
      const newTech = { firstName, lastName };
      addTech(newTech);
      M.toast({ html: `${firstName} ${lastName} added!` });
    }

    // Clear Fields
    setFirstName('');
    setLastName('');
  };

  return (
    <div id='add-tech-modal' className='modal'>
      <div className='modal-content'>
        <h4>New Technician</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              id='firstName'
              type='text'
              name='firstName'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <label htmlFor='firstName' className='active'>
              First Name
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              id='lastName'
              type='text'
              name='lastName'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <label htmlFor='lastName' className='active'>
              Last Name
            </label>
          </div>
        </div>
        <div className='modal-footer'>
          <a
            href='#!'
            className='modal-close waves-effect waves-light btn blue'
            onClick={onSubmit}
          >
            Enter
          </a>
        </div>
      </div>
    </div>
  );
};

AddTechModal.propsType = {
  addTech: PropTypes.func.isRequired
};

export default connect(
  null,
  { addTech }
)(AddTechModal);
