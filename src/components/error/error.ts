import Block from '../../core/Block';
import { Button } from '../ui/button';
import { TYPE_BUTTON } from '../ui/button/button';

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
		const label = this.props.label as string;
		const ButtonCreateAccount = new Button({
			label: label,
			style: TYPE_BUTTON.LINK,
			onClick: () => console.log('error')});
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
