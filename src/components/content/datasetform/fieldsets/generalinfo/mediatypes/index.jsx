import React, { Component } from 'react';
import styles from '../../../datasetform.scss';
import generalStyles from '../../../../../../general_styles/general_styles.scss';
import CbItem from '../../../../../ui/checkboxlistitem';
import { updateField } from '../../../../../../redux/actions/datasetform';

export default class MediaTypes extends Component {
  update(key, checked) {
    const { dispatch, mediaTypes = [] } = this.props;
    const newvals = checked ? [...mediaTypes, key] : mediaTypes.filter(thisval => thisval !== key);
    dispatch(updateField('mediatype', newvals));
  }

  render() {
    const { dispatch, mediaTypes = [] } = this.props;

    const availableMediaTypes = {
      text: 'Tekstiä',
      audio: 'Ääntä',
      video: 'Videoita',
      images: 'Kuvia',
      other: 'Muuta'
    };

    return (
      <div className={styles.fieldContainer}>
        <label>Sisältää</label>
        <div>
          <ul className={`${generalStyles.responsiveList} ${styles.mediatypeList}`}>
            {Object.keys(availableMediaTypes).map(key => (
              <CbItem
                value={key}
                id={`mediatype_${key}`}
                onChange={ev => this.update(ev.target.value, ev.target.checked)}
                checked={mediaTypes.includes(key)}
              >
                {availableMediaTypes[key]}
              </CbItem>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
