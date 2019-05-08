import React, { Component } from 'react';
import styles from '../../../datasetform.scss';
import generalStyles from '../../../../../../general_styles/general_styles.scss';
import CbItem from '../../../../../ui/checkboxlistitem';
import { updateField } from '../../../../../../redux/actions/datasetform';

export default class MediaTypes extends Component {
  update(key, checked) {
    const { dispatch, mediaTypes = [] } = this.props;
    const newvals = checked ? [...mediaTypes, key] : mediaTypes.filter(thisval => thisval !== key);
    dispatch(updateField('mediatypes', newvals));
  }

  render() {
    const mediaTypes = {
      text: 'Tekstiä',
      audio: 'Ääntä',
      video: 'Videoita',
      images: 'Kuvia'
    };

    return (
      <div className={styles.fieldContainer}>
        <label>Sisältää</label>
        <div>
          <ul className={`${generalStyles.responsiveList} ${styles.mediatypeList}`}>
            {Object.keys(mediaTypes).map(key => (
              <CbItem value={key} onChange={ev => this.update(ev.target.value, ev.target.checked)}>
                {mediaTypes[key]}
              </CbItem>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
