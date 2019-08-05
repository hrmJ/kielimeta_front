import PropTypes from 'prop-types';
import React from 'react';

import { formatNo } from '../../../../../utils';
import Icon from '../../../../ui/icon';
import generalStyles from '../../../../../general_styles/general_styles.scss';
import styles from './sizeInfo.scss';

const sizeInfo = props => {
  const { tokens, audiohours, videohours, texts, words, sentences } = props;

  if (!(tokens || audiohours || videohours || texts || words || sentences)) {
    return null;
  }

  return (
    <div>
      <h4>Aineiston koko:</h4>
      <ul className={`${generalStyles.nobullet} ${generalStyles.noIndent} ${styles.mainList}`}>
        {texts && (
          <li>
            <Icon iconName="faFileAlt" />
            {`${formatNo(texts)} tekstiä`}
          </li>
        )}
        {sentences && (
          <li>
            <Icon iconName="faFileAlt" />
            {`${formatNo(sentences)} virkettä`}
          </li>
        )}
        {words && (
          <li>
            <Icon iconName="faFileAlt" />
            {`${formatNo(words)} sanaa`}
          </li>
        )}
        {tokens && (
          <li>
            <Icon iconName="faFileAlt" />
            {`${formatNo(tokens)} sanetta`}
          </li>
        )}
        {audiohours && (
          <li>
            <Icon iconName="faMusic" /> {`${formatNo(audiohours)} tuntia ääntä`}
          </li>
        )}
        {videohours && (
          <li>
            <Icon iconName="faVideo" />
            {`${formatNo(videohours)} tuntia videoita`}
          </li>
        )}
      </ul>
    </div>
  );
};

sizeInfo.propTypes = {
  tokens: PropTypes.number,
  audiohours: PropTypes.number,
  videohours: PropTypes.number,
  texts: PropTypes.number,
  words: PropTypes.number,
  sentences: PropTypes.number
};

sizeInfo.defaultProps = {
  tokens: null,
  audiohours: null,
  videohours: null,
  texts: null,
  words: null,
  sentences: null
};

export default sizeInfo;
