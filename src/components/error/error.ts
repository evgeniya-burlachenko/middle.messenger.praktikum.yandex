import Block from '../../core/Block';
import { navigate } from '../../main';
import { Button } from '../button';
import { TYPE_BUTTON } from '../button/button';

interface ErrorTemplateProps{
	code: string;
	message: string;
	label: string;
	type: string;
	page: string
}

class ErrorTemplate extends Block{
	constructor(props: ErrorTemplateProps){
		super({
			...props,
		});
	}
	init(){
		const navName = this.props.page as string;
		const label = this.props.label as string;
		const ButtonCreateAccount = new Button({label: label, type: TYPE_BUTTON.LINK, onClick: ()=> navigate(navName)});
		this.children = {
			...this.children,
			ButtonCreateAccount,
		};
	}
	render():string {
		return `
			<div class = 'error-container'>	
				<div class = 'error'>
					<div class = 'error__code'>{{code}}</div>
					<div class = 'error__message'>{{message}}</div>
				</div>
				{{{ ButtonCreateAccount }}}
			</div>
		`;
	}
}
export default ErrorTemplate;
