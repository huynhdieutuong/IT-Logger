import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateLog, clearCurrent } from '../../redux/actions/logActions';

import TechSelectOptions from '../techs/TechSelectOptions';
import M from 'materialize-css/dist/js/materialize.min.js';

const EditLogModal = ({ current, updateLog, clearCurrent }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  useEffect(() => {
    if (current !== null) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

  const onSubmit = async () => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      const uptLog = {
        id: current.id,
        message,
        tech,
        attention,
        date: Date.now()
      };
      await updateLog(uptLog);
      M.toast({ html: `Log updated by ${tech}` });
      clearCurrent();
    }

    // Clear Fields
    setMessage('');
    setTech('');
    setAttention(false);
  };

  const modalStyle = {
    width: '75%',
    height: '75%'
  };

  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              id='message'
              type='text'
              name='message'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={e => setTech(e.target.value)}
            >
              <option value='' disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  checked={attention}
                  onChange={e => setAttention(!attention)}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
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
  );
};

EditLogModal.propsType = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  current: state.log.current
});

export default connect(
  mapStateToProps,
  { updateLog, clearCurrent }
)(EditLogModal);
