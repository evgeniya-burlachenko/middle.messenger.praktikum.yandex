import Block  from '../../../core/Block';
import Router from '../../../core/Router';
import { IStoreData, connect } from '../../../core/Store';
import AuthController from '../../../core/controllers/AuthController';
import { FormChangePassword } from '../../modules/profile/formChangePassword';
import { FormProfile } from '../../modules/profile/formProfile';
import { FormProfileEdit } from '../../modules/profile/formProfileEdit';

interface IFormProfileWrapper{
	onSubmit?: (e: Event) => void;
	formBodyProfile?: typeof FormProfile | typeof FormProfileEdit | typeof FormChangePassword,
	
}
class FormProfileWrapper extends Block {
	constructor(props: IFormProfileWrapper) {
		super({...props,
			events: {
				submit: props.onSubmit,
			},
		})
	}
	componentDidMount() {
		AuthController.fetchUser().catch(() => new Router().go('/'));

	  }
	render() {
		return (`
			<Form class="profile" onsubmit = "return false">
                {{{ formBodyProfile }}} 
            </Form>`
		);
	}
}
const mapStateToProps = (state: IStoreData) => {
	return { currentUser : state.currentUser}
}

export default  connect(mapStateToProps)(FormProfileWrapper)