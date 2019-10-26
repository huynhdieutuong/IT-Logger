import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Preloader from '../layout/Preloader';
import LogItem from './LogItem';

import { getLogs, setLoading } from '../../redux/actions/logActions';

const Logs = props => {
  const {
    log: { logs, loading },
    getLogs,
    setLoading
  } = props;

  useEffect(() => {
    setLoading();
    getLogs();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {logs.length > 0 ? (
        logs.map(log => <LogItem log={log} key={log._id} />)
      ) : (
        <p className='center'>No logs to show...</p>
      )}
    </ul>
  );
};

Logs.propsType = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  log: state.log
});

export default connect(
  mapStateToProps,
  { getLogs, setLoading }
)(Logs);
