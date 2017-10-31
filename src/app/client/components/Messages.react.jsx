import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Axios from 'axios';
import config from '../../../../app.config';

import Spinner from './Spinner/Spinner.react.jsx';
import MessageRow from './MessageRow.react.jsx';

const axios = Axios.create({
  baseURL: config.baseURL,
  timeout: 30000
});

class Messages extends React.Component {
  constructor(props) {
    super(props);

    NProgress.configure({
      showSpinner: false
    });

    this.state = {
      isLoading: false,
      messages: [],
      current: `/messages/?format=json&page=${props.params.page}`,
      previous: null,
      next: null
    };

    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    this.fetchMessages();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }

  async fetchMessages(url) {
    this.setState({
      isLoading: true
    });

    try {
      const {
        data: {
          results: messages,
          next,
          previous
        }
      } = await axios.get(url || this.state.current);

      this.setState({
        isLoading: false,
        messages,
        next,
        previous
      });
    } catch (e) {
      // If the request fails, try again in 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.fetchMessages(url);
    }
  }

  async previous() {
    await this.fetchMessages(this.state.previous);
    this.props.router.push(`/messages/${parseInt(this.props.params.page, 10) - 1}`);
  }

  async next() {
    await this.fetchMessages(this.state.next);
    this.props.router.push(`/messages/${parseInt(this.props.params.page, 10) + 1}`);
  }

  render() {
    const tableStyle = {
      width: '100%'
    };

    const createdStyle = {
      minWidth: '150px'
    };

    return (
      <div id="messages">
        <div className="container">

          {this.state.isLoading ? (

            <Spinner />

          ) : (

            <div>

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
                    <th style={createdStyle}>Created</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {this.state.messages.map(message => <MessageRow key={message.id} message={message} />)}
                </tbody>
              </table>

            </div>

          )}
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
