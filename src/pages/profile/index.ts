import { connect } from '../../core/Store';
import Profile from './profile';

const withUser = connect((state) => {

	return ({ ...state.currentUser });});
export default withUser(Profile);


