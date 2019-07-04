import PropTypes from 'prop-types';
import React from 'react';

import Author from './author';
import TabContent from '../../../ui/TabContent';
import styles from './author.scss';

const Authors = props => {
  const { authors } = props;
  let parsedAuthors;

  if (!Array.isArray(authors) && authors) {
    parsedAuthors = JSON.parse(authors);
  }

  return (
    <TabContent>
      <ul className={styles.authorList}>
        {Array.isArray(parsedAuthors) &&
          parsedAuthors.map(author => <Author key={author.id} details={author} />)}
      </ul>
    </TabContent>
  );
};

Authors.propTypes = {
  authors: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.string])
};

Authors.defaultProps = {
  authors: ''
};

export default Authors;
