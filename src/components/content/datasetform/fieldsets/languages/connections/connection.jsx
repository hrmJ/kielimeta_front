import PropTypes from 'prop-types';
import React from 'react';

import { Select } from '../../../../../ui/localizedSelect';
import ClosableBox from '../../../../../ui/closablebox';
import { updateField } from '../../../../../../redux/actions/datasetform';
import styles from './styles.scss';

const LanguageConnections = props => {
  const { languages, connections, languageNames, dispatch, idx, connection } = props;
  const { sl, tl } = connection;
  const langOptions = languages.map((lang, langIdx) => {
    const { details = {} } = lang;
    const { language_code: languageCode } = details;
    return {
      label: languageNames[languageCode],
      value: langIdx
    };
  });

  return (
    <div className={styles.container}>
      <ClosableBox
        onClose={() =>
          dispatch(updateField('connections', (connections.splice(idx, 1), connections)))
        }
      >
        <div className={styles.selectContainer}>
          <div>
            <div>Lähdekieli</div>
            <Select
              id={`sl_${idx}`}
              options={langOptions}
              value={sl !== undefined && langOptions.filter(l => l.value === sl)[0]}
              onChange={selected =>
                dispatch(
                  updateField(
                    'connections',
                    (connections.splice(idx, 1, { ...connection, ...{ sl: selected.value } }),
                    connections)
                  )
                )
              }
            />
          </div>
          <div>
            <div>Kohdekielet</div>
            <Select
              id={`tl_${idx}`}
              options={langOptions}
              isMulti
              onChange={selected =>
                dispatch(
                  updateField(
                    'connections',
                    (connections.splice(idx, 1, {
                      ...connection,
                      ...{ tl: selected.map(lang => lang.value) }
                    }),
                    connections)
                  )
                )
              }
              value={tl && langOptions.filter(option => tl.includes(option.value))}
            />
          </div>
        </div>
      </ClosableBox>
    </div>
  );
};

LanguageConnections.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.shape({ code: PropTypes.string })).isRequired,
  connections: PropTypes.arrayOf(
    PropTypes.shape({ sl: PropTypes.number, tl: PropTypes.arrayOf(PropTypes.number) })
  ),
  connection: PropTypes.shape({ sl: PropTypes.number, tl: PropTypes.arrayOf(PropTypes.number) }),
  languageNames: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired
};

LanguageConnections.defaultProps = {
  connections: [],
  connection: {},
  languageNames: {}
};

export default LanguageConnections;
