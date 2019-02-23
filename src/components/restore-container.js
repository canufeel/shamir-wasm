import { connect } from 'react-redux';
import Restore from './restore';
import { selectRestoreFromState } from '../selectors/restore';
import { onRestore } from 'actions';
import { restoreShamir } from 'wasm';

const mapStateToProps = state => ({
  secret: selectRestoreFromState(state),
});

const mergedProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  onRestore: data => {
    const restoredSecret = restoreShamir(data);
    return dispatchProps.onRestore(restoredSecret);
  }
});

const RestoreContainer = connect(
  mapStateToProps,
  {
    onRestore
  },
  mergedProps
)(Restore);

export default RestoreContainer;
