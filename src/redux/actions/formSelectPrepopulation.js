import { thunkCreator } from './utils';
import { baseUrl } from './datasets';

class PrepopulationAction {
  constructor(path, valueName) {
    this.url = `${baseUrl}/${path}`;
    this.actionName = path.toUpperCase().replace('_', '');
    this.valueName = valueName;
  }

  launch() {
    return thunkCreator({
      types: [
        `FETCH_${this.actionName}_REQUEST`,
        `FETCH_${this.actionName}_SUCCESS`,
        `FETCH_${this.actionName}_FAILURE`
      ],
      promise: fetch(this.url, { mode: 'cors' })
        .then(response => response.json())
        .then(vals => ({
          vals,
          key: this.valueName
        }))
    });
  }
}

const prepopulateFormSelects = () => dispatch => {
  const annotationLevels = new PrepopulationAction('annotation_levels', 'annotationLevels');
  const resourceTypes = new PrepopulationAction('resourcetypes', 'resourceTypes');
  const genres = new PrepopulationAction('text_genres', 'textGenres');
  return dispatch(annotationLevels.launch())
    .then(() => dispatch(resourceTypes.launch()))
    .then(dispatch(genres.launch()));
};

export { PrepopulationAction, prepopulateFormSelects };
