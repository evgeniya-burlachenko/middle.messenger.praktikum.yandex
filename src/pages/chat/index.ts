import { connect } from '../../core/Store';
import Chat from './chat';

const withUser = connect((state) => {
	return ({ ...state.currentUser });});
export default withUser(Chat);

