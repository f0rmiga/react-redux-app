import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar.react.jsx';

function App(props) {
  return (
    <div>
      <NavBar />

      {props.children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.object
};

App.defaultProps = {
  children: {}
};

export default App;
