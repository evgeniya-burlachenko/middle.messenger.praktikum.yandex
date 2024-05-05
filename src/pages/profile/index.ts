import { connect } from '../../core/Store';
import Profile from './profile';

const withUser = connect((state) => {
	// console.log("!!!stateProfile", state)
	return ({ ...state.currentUser })});
export default withUser(Profile);


// import { withStore } from '../../common/Store';
// import { ProfilePage } from './profile';
// import { connect } from '../../core/Store';

// const withUser = withStore((state) => ({ ...state.currentUser }));

// export default withUser(ProfilePage);
