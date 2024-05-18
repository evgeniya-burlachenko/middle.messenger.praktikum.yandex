import Block  from '../../../core/Block';
import Router from '../../../core/Router';
import { IStoreData, connect } from '../../../core/Store';
import AuthController from '../../../core/controllers/AuthController';
import { FormProfile } from '../../modules/profile/formProfile';


interface IFormProfileWrapper{
	onSubmit?: () => void;
	formBodyProfile?: typeof FormProfile
}
class FormProfileWrapper extends Block {
	constructor(props: IFormProfileWrapper) {
		super({...props,
			events: {
				submit: props.onSubmit,
			},
		});
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
	return { currentUser : state.currentUser};
};

export default  connect(mapStateToProps)(FormProfileWrapper);
