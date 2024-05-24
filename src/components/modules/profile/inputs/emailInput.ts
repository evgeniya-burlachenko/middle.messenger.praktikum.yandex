import { InputProfile } from '../../..';

import { IStoreData, connect } from '../../../../core/Store';

class EmailInput extends InputProfile{}

export default connect((state: IStoreData) => ({value: state.currentUser?.email}))(EmailInput);
