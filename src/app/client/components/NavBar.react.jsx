import React from 'react';
import LinkItem from 'found/lib/Link';

function Menu() {
  const style = {
    marginBottom: '15px'
  };

  const titleStyle = {
    color: 'white',
    padding: '10px 30px'
  };

  return (
    <nav className="navbar is-dark" style={style} aria-label="main navigation">
      <div className="navbar-start">
        <p className="title" style={titleStyle}>Message app</p>
      </div>
      <div className="navbar-end">

        {window.location.pathname.match(/(\/messages\/)[0-9]+/g) &&

          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <LinkItem className="button is-success" to="/newmessage">
                  <span className="icon">
                    <i className="fa fa-plus" aria-hidden="true" />
                  </span>
                  <span>New message</span>
                </LinkItem>
              </p>
            </div>
          </div>

        }

      </div>
    </nav>
  );
}

export default Menu;
