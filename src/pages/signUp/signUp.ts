import { FormWrapper } from '../../components';
import Block from '../../core/Block';

export interface IAuthPageProps {
	FormAuth: FormWrapper;
}

export default class AuthPage extends Block {
	constructor(props: IAuthPageProps) {
		super({
			...props,
			FormAuth: new FormWrapper({
				title: 'Регистрация',
				type: 'signUp',
			}),
		});
	}
	render(): string {
		return `
			<div>
				{{{ FormAuth }}}
			</div>
        `;
	}
}
