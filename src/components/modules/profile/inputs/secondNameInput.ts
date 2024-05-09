import { InputProfile } from "../../..";

import { IStoreData, connect } from '../../../../core/Store';

class SecondNameInput extends InputProfile{}

export default connect((state: IStoreData) => ({value: state.currentUser?.second_name}))(SecondNameInput)
