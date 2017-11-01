import React from 'react';
import PropTypes from 'prop-types';
import NProgress from 'nprogress';
import Axios from 'axios';
import moment from 'moment';
import config from '../../../../app.config';

import Spinner from './Spinner/Spinner.react.jsx';

const axios = Axios.create({
  baseURL: config.baseURL,
  timeout: 30000
});

class MessageDetails extends React.Component {
  constructor(props) {
    super(props);

    NProgress.configure({
      showSpinner: false
    });

    this.state = {
      isLoading: false,
      id: null,
      text: null,
      author: null,
      in_reply_to: null,
      created_at: null
    };

    this.back = this.back.bind(this);
    this.fetchMessage = this.fetchMessage.bind(this);
  }

  componentDidMount() {
    this.fetchMessage();
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }

  back() {
    this.props.router.push('/');
  }

  async fetchMessage() {
    this.setState({
      isLoading: true
    });

    try {
      const {
        data: {
          id,
          text,
          author,
          in_reply_to,
          created_at
        }
      } = await axios.get(`/messages/${this.props.params.id}/?format=json`);

      this.setState({
        isLoading: false,
        id,
        text,
        author,
        in_reply_to,
        created_at
      });
    } catch (e) {
      // If the request fails, try again in 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.fetchMessage();
    }
  }

  render() {
    const columnStyle = {
      display: 'inline-block',
      padding: '10px'
    };

    return (
      <div className="container">

        {this.state.isLoading ? (

          <Spinner />

        ) : (

          <div>
            <div style={columnStyle}>
              <p>
                <span>ID</span>
              </p>
              <p>
                <span>Text</span>
              </p>
              <p>
                <span>Author</span>
              </p>
              <p>
                <span>In reply to</span>
              </p>
              <p>
                <span>Created</span>
              </p>
            </div>

            <div style={columnStyle}>
              <p>
                <span>{this.state.id || '-'}</span>
              </p>
              <p>
                <span>{this.state.text || '-'}</span>
              </p>
              <p>
                <span>{this.state.author || '-'}</span>
              </p>
              <p>
                <span>{this.state.in_reply_to || '-'}</span>
              </p>
              <p>
                <span>
                  {
                    this.state.created_at
                    ? moment(this.state.created_at).format('DD/MM/YY h:mm')
                    : '-'
                  }
                </span>
              </p>
            </div>

            <div className="field">
              <div className="control">
                <button className="button" onClick={this.back}>Back</button>
              </div>
            </div>
          </div>

        )}
      </div>
    );
  }
}

MessageDetails.propTypes = {
  router: PropTypes.any.isRequired,
  params: PropTypes.any.isRequired
};

export default MessageDetails;
