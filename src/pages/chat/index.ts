import { connect } from '../../core/Store';
import Chat from './chat';

const withUser = connect((state) => {
	// console.log("!!!stateProfile", state)
	return ({ ...state.currentUser })});
export default withUser(Chat);

