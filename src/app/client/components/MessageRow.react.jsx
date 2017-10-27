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
          <button className="button is-small is-danger" onClick={this.remove}>Remove</button>
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
  }).isRequired
};

export default MessageRow;
