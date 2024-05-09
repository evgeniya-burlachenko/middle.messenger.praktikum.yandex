import { InputProfile } from "../../..";
import { IStoreData, connect } from "../../../../core/Store";


class LoginInput extends InputProfile{}

export default connect((state: IStoreData) => ({value: state.currentUser?.login}))(LoginInput)