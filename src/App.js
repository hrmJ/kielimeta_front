import { connect } from 'react-redux';
import Main from './components/main';

function mapStateToProps(state) {
  return {
    datasets: state.datasets,
    datasetform: state.datasetform,
    loadingState: state.loadingState,
    filters: state.datasetFilters,
    originalFilterValues: state.originalFilterValues,
    preloadedSelects: state.preloadedSelects,
    languageVarieties: state.languageVarieties,
    languageVarietyTypes: state.languageVarietyTypes,
    languageNames: state.languageNames,
    loadStatus: state.loadStatus,
    editedId: state.editedId
  };
}

const App = connect(mapStateToProps)(Main);

export default App;
