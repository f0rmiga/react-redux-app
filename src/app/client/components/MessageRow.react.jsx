import React from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import moment from 'moment';
import config from '../../../../app.config';

const axios = Axios.create({
  baseURL: config.baseURL,
  timeout: 30000
});

class MessageRow extends React.Component {
  constructor(props) {
    super(props);

    this.remove = this.remove.bind(this);
  }

  details() {
    this.props.router.push(`/details/${this.props.message.id}`);
  }

  async remove() {
    await axios.delete(`/messages/${this.props.message.id}/`);
    window.location.reload();
  }

  render() {
    const deleteStyle = {
      textAlign: 'right'
    };

    return (
      <tr>
        <td>{this.props.message.id}</td>
        <td>{this.props.message.text}</td>
        <td>{moment(this.props.message.created_at).format('DD/MM/YY h:mm')}</td>
        <td style={deleteStyle}>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-small" onClick={this.details}>
                Details
              </button>
            </div>
            <div className="control">
              <button className="button is-small is-danger" onClick={this.remove}>
                Remove
              </button>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

MessageRow.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    created_at: PropTypes.string
  }).isRequired,
  router: PropTypes.any.isRequired
};

export default MessageRow;
