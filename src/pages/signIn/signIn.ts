import { FormLogin, FormWrapper } from '../../components';
import Block from '../../core/Block';

export interface ILoginPageProps{

}

export  interface IFormDataProps{
	login?: string,
	password?: string
}
export default class LoginPage extends Block {
	constructor(props: ILoginPageProps) {
		super({
			...props,
			FormLogin: new FormWrapper({
				title: 'Вход',
				formBody: new FormLogin({FormDataProps: {login: "", password: ""}}),
				type: 'signIn',
				onSubmit: (e) => {
					e.preventDefault();
					const formData = this.children.FormLogin.children.formBody.props.FormDataProps  as  IFormDataProps
					const btnError = this.children.FormLogin.children.formBody.children.ButtonLogin
					if(!formData || !formData.login || !formData.password){
						btnError.setProps({ error: 'ошибка', errorText:  'Форма содержит ошибки, submit' });
						return
					}
					btnError.setProps({error: '', errorText: ''})
					console.log('!!!!Данные формы(submit):', formData)
				},
			}),
		});
	}

	render():string {
		return `
            <div>
                {{{ FormLogin }}}
            </div>
        `;
	}
}
