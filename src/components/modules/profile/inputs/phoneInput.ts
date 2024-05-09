import { InputProfile } from "../../..";
import { IStoreData, connect } from "../../../../core/Store";


class PhoneInput extends InputProfile{}

export default connect((state: IStoreData) => ({value: state.currentUser?.phone}))(PhoneInput)