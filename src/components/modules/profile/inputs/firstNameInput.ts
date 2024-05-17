import { InputProfile } from '../../..';

import { IStoreData, connect } from '../../../../core/Store';

class FirstNameInput extends InputProfile{}

export default connect((state: IStoreData) =>
	({value: state.currentUser?.first_name}))(FirstNameInput);
