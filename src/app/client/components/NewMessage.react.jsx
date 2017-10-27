import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import config from '../../../../app.config';

const axios = Axios.create({
  baseURL: config.baseURL,
  timeout: 30000
});

class NewMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  async add() {
    const { text } = this.state;
    await axios.post('/messages/', { text });
    this.props.router.push('/');
  }

  cancel() {
    this.props.router.push('/');
  }

  render() {
    return (
      <div className="container">
        <div className="field">
          <label htmlFor="text" className="label">Text</label>
          <div className="control">
            <textarea value={this.state.text} onChange={this.handleChange} id="text" className="textarea" placeholder="Enter the text for the message" rows="10" />
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-success" onClick={this.add}>Add</button>
          </div>
          <div className="control">
            <button className="button" onClick={this.cancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

NewMessage.propTypes = {
  router: PropTypes.any.isRequired
};

export default NewMessage;
