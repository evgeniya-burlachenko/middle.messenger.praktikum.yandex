import { ErrorTemplate } from '../../components/error';
import Block from '../../core/Block';

export interface IErrorPage500{
	Error: ErrorTemplate
}
export default class ErrorPage500 extends Block{
	constructor(props: IErrorPage500){
		super({
			...props,
			Error: new ErrorTemplate({
				code: '500',
				message:'Мы уже фиксим',
				label: 'Нет аккаута?',
				type: 'link',
				page: 'signUp',
			}),
		});
	}
	render():string{
		return `
			<div class="error">	
				{{{Error}}}
			</div>
		`;
	}
}
