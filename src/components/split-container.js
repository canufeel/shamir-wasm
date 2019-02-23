import { connect } from 'react-redux';
import Split from './split';
import { selectSplitResultsFromState } from '../selectors/split-results';
import { selectSplitFromState } from '../selectors/split';
import {
  onSplitPropChange,
  onAddSplitResults
} from 'actions';
import { splitSecretShamir } from '../wasm';


const mapStateToProps = state => ({
  ...selectSplitFromState(state),
  keys: selectSplitResultsFromState(state),
});

const mergedProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  onSplitPropChange: (key) => (e) => dispatchProps.onSplitPropChange({
    key,
    value: e.target.value,
  }),
  onAddSplitResults: () => {
    const splitResults = splitSecretShamir(
      stateProps.secret,
      parseInt(stateProps.threshold),
      parseInt(stateProps.sharesNum),
    );
    return dispatchProps.onAddSplitResults(splitResults);
  },
});

const SplitContainer = connect(
  mapStateToProps,
  {
    onSplitPropChange,
    onAddSplitResults,
  },
  mergedProps
)(Split);

export default SplitContainer;
