import React from 'react';
import PropTypes from 'prop-types';
import LinkItem from './LinkItem.react.jsx';

function App(props) {
  return (
    <div>
      <h1>SVZ</h1>
      <ul>
        <LinkItem to="/">
          Main
        </LinkItem>
        <LinkItem to="/foo">
          foo
        </LinkItem>
      </ul>
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
