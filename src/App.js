import { connect } from 'react-redux';
import Main from './components/main/index.jsx';

function mapStateToProps(state) {
  return {
    datasets: state.datasets,
    datasetform: state.datasetform,
    loadingState: state.loadingState,
  };
}

const App = connect(mapStateToProps)(Main);

export default App;
