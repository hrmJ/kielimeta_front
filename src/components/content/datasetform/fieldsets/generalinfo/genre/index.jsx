import PropTypes from 'prop-types';
import React from 'react';

import { CreatableSelect } from '../../../../../ui/localizedSelect';
import { selectStyle } from '../../../../../../general_styles/jsStyles';
import { updateField } from '../../../../../../redux/actions/datasetform';
import LabelledInput from '../../../../../ui/labelledinput';
import formStyles from '../../../datasetform.scss';

const genreSelect = props => {
  const { resourcetype, textGenres, genre, dispatch, mediaTypes } = props;

  return (
    <div className={formStyles.upperContainer}>
      {typeof resourcetype === 'string' &&
        resourcetype.includes('korpus') &&
        mediaTypes.includes('text') && (
          <LabelledInput label="Aineiston sisältämien tekstien genre">
            <CreatableSelect
              options={textGenres.map(t => ({ label: t, value: t }))}
              styles={selectStyle}
              isMulti
              onChange={selected => dispatch(updateField('genre', selected.map(sel => sel.value)))}
              value={genre.map(g => ({ label: g, value: g }))}
            />
          </LabelledInput>
        )}
    </div>
  );
};

genreSelect.propTypes = {
  resourcetype: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ location: PropTypes.object })
  ]),
  textGenres: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
  genre: PropTypes.arrayOf(PropTypes.string),
  mediaTypes: PropTypes.arrayOf(PropTypes.string)
};

genreSelect.defaultProps = {
  resourcetype: '',
  textGenres: [],
  mediaTypes: [],
  genre: []
};

export default genreSelect;
