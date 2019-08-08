import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MediaType extends Component {
  convertMediaType() {
    const { mediaType, mediaDescription } = this.props;
    switch (mediaType) {
      case 'text':
        return 'tekstiä';
      case 'audio':
        return 'ääntä';
      case 'video':
        return 'videoita';
      case 'other':
        return mediaDescription || 'muuta';
      default:
        return mediaType;
    }
  }

  render() {
    return <div>{this.convertMediaType()}</div>;
  }
}

MediaType.propTypes = {
  mediaType: PropTypes.string.isRequired,
  mediaDescription: PropTypes.string
};

MediaType.defaultProps = {
  mediaDescription: ''
};

export default MediaType;
