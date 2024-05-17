import Block, { IComponentProps }  from '../../../core/Block';
import Router from '../../../core/Router';
import { IStoreData, connect } from '../../../core/Store';
import AuthController from '../../../core/controllers/AuthController';
import { FormProfile } from '../../modules/profile/formProfile';


interface IFormProfileWrapper{
	onSubmit?: () => void;
	onClick?: () => void
	formBodyProfile?: typeof FormProfile
}
class FormProfileWrapper extends Block {
	constructor(props: IFormProfileWrapper) {
		super({...props,
			events: {
				submit: props.onSubmit,
				click: props.onClick,
			},
		});
	}
	componentDidMount() {

		AuthController.fetchUser().catch(() => new Router().go('/'));

	  }
	  componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps): boolean {
		if(oldProps === newProps) {
			return false;
		}
    	if(this.props !== newProps){
			this.props = newProps;
			this.render();
			return true;
	  }
	  return false;
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
