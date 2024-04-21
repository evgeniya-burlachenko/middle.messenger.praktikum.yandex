import { FormLogin, FormWrapper } from '../../components';
import Block from '../../core/Block';

export interface ILoginPageProps{
	inputs?: []

}
export default class LoginPage extends Block {
	constructor(props: ILoginPageProps) {
		super({
			...props,
			FormLogin: new FormWrapper({
				title: 'Вход',
				formBody: new FormLogin({}),
				type: 'signIn',
			}),
		});
	}

	render():string {
		return `
            <div">
                {{{ FormLogin }}}
            </div>
        `;
	}
}
