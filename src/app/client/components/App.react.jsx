import React from 'react';
import PropTypes from 'prop-types';

import Menu from './Menu.react.jsx';

function App(props) {
  return (
    <div>
      <Menu />

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
