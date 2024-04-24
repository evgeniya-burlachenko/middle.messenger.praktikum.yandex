
import Block, { IComponentProps } from '../../../core/Block';
import { FormAuth } from '../../modules/registration/formAuth';
import { FormLogin } from '../../modules/registration/formLogin';

interface IFormWrapper{
	onSubmit?: (e: Event) => void;
	title?: string,
	formBody?: FormLogin,
	type?: string

}

export default class FormWrapper extends Block {
	constructor(props: IFormWrapper) {
		super({...props,
			events: {
				submit: props.onSubmit,
			}});
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
	init() {
		const handleSwitchToSignIn = this.handleSwitchToSignIn.bind(this);
		const {type} = this.props;

		const formBody = type ==='signIn' ? new FormLogin({
			onClick: () => handleSwitchToSignIn(),
		}) : new FormAuth({
			onClick: () => handleSwitchToSignIn()});
		this.children = {
			...this.children,
			formBody,
		};
	}
	handleSwitchToSignIn(){
		return;
	}
	render() {
		return (`      
			<Form class="form" onsubmit = "return false">
                <p class="form-title">{{title}}</p>
                <div class="form-content">
					{{{ formBody }}} 
                </div>
            </Form>`
		);
	}
}
