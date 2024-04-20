
import Block, { IComponentProps } from '../../core/Block';
import { FormAuth } from '../formAuth';
import { FormLogin } from '../formLogin';

interface IFormWrapper{

}

export default class FormWrapper extends Block {
	constructor(props: IFormWrapper) {
		super({...props});
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
			<Form class="form">
                <p class="form-title">{{title}}</p>
                <div class="form-content">
					{{{ formBody }}} 
                </div>
            </Form>`
		);
	}
}
