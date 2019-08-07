import React from 'react';
import PropTypes from 'prop-types';

const track = (props, children) => {
  return (
    <div
      style={{
        height: '6px',
        width: '100%',
        backgroundColor: '#ccc'
      }}
    >
      <div>m</div>
    </div>
  );
};

track.propTypes = {};

export default track;
