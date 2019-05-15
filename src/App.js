import { connect } from 'react-redux';
import Main from './components/main';

function mapStateToProps(state) {
  return {
    datasets: state.datasets,
    datasetform: state.datasetform,
    loadingState: state.loadingState,
    filters: state.datasetFilters,
    originalFilterValues: state.originalFilterValues,
    originalFormValues: state.originalFormValues,
    languageVarieties: state.languageVarieties,
  };
}

const App = connect(mapStateToProps)(Main);

export default App;
