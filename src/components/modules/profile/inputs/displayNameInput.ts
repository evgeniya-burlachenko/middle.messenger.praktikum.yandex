import { InputProfile } from '../../..';

import { IStoreData, connect } from '../../../../core/Store';

class DisplayNameInput extends InputProfile{}

export default connect((state: IStoreData) => ({value: state.currentUser?.display_name}))(DisplayNameInput);
