import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import config from '../../../../app.config';

import MessageRow from './MessageRow.react.jsx';

const axios = Axios.create({
  baseURL: config.baseURL,
  timeout: 30000
});

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      current: `/messages/?format=json&page=${props.params.page}`,
      previous: null,
      next: null
    };

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  async componentDidMount() {
    try {
      await this.fetchMessages();
    } catch (e) {
      window.alert('Failed fetching messages');
    }
  }

  async fetchMessages(url) {
    const {
      data: {
        results: messages,
        next,
        previous
      }
    } = await axios.get(url || this.state.current);

    this.setState({
      messages,
      next,
      previous
    });
  }

  async previous() {
    try {
      await this.fetchMessages(this.state.previous);
      this.props.router.push(`/messages/${parseInt(this.props.params.page, 10) - 1}`);
    } catch (e) {
      window.alert('Failed fetching messages');
    }
  }

  async next() {
    try {
      await this.fetchMessages(this.state.next);
      this.props.router.push(`/messages/${parseInt(this.props.params.page, 10) + 1}`);
    } catch (e) {
      window.alert('Failed fetching messages');
    }
  }

  render() {
    const tableStyle = {
      width: '100%'
    };

    return (
      <div>
        <div className="container">
          <div className="field is-grouped">
            <div className="control">
              <button className="button" onClick={this.previous} disabled={!this.state.previous}>
                Previous
              </button>
            </div>
            <div className="control">
              <button className="button" onClick={this.next} disabled={!this.state.next}>
                Next
              </button>
            </div>
          </div>
          <table style={tableStyle} className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Text</th>
                <th>Created</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.state.messages.map(message => <MessageRow key={message.id} message={message} />)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Messages.propTypes = {
  router: PropTypes.any.isRequired,
  params: PropTypes.any.isRequired
};

export default Messages;
