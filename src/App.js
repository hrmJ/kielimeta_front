import { connect } from 'react-redux';
import Main from './components/main/index.jsx';

function mapStateToProps(state) {
  return {};
}

const App = connect(mapStateToProps)(Main);

export default App;
