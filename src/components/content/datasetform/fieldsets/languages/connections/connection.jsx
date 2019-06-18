import { updateField } from '../../../../../../redux/actions/datasetform';

import PropTypes from 'prop-types';
import React from 'react';

import { Select } from '../../../../../ui/localizedSelect';
import ClosableBox from '../../../../../ui/closablebox';
import styles from './styles.scss';

const LanguageConnections = props => {
  const { languages, connections, languageNames, dispatch, idx, connection } = props;
  const { sl, tl } = connection;
  const langOptions = languages.map((lang, idx) => {
    const { details = {} } = lang;
    const { language_code } = details;
    return {
      label: languageNames[language_code],
      value: idx
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
  connections: PropTypes.arrayOf({ sl: PropTypes.string, tl: PropTypes.arrayOf(PropTypes.string) }),
  connection: PropTypes.shape({ sl: PropTypes.string, tl: PropTypes.string })
};

LanguageConnections.defaultProps = {
  connections: [],
  connection: {}
};

export default LanguageConnections;
