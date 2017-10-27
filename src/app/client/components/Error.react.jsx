import React from 'react';
import PropTypes from 'prop-types';

function Error({ error }) {
  return (
    <div>
      {error.status === 404 ? 'Not found' : 'Error'}
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.object.isRequired
};

export default Error;
