import { FormAuth, FormWrapper } from '../../components';
import Block from '../../core/Block';

export interface IAuthPageProps {
}
export  interface IFormDataProps{
	login?: string,
	name?: string,
	email?: string,
	surname?: string,
	phone?: string,
	password?: string,
	passwordRepeat?: string,
}

export default class AuthPage extends Block {
	constructor(props: IAuthPageProps) {
		super({
			...props,
			FormAuth: new FormWrapper({
				title: 'Регистрация',
				type: 'signUp',
				formBody: new FormAuth({FormDataProps: {}}),
				onSubmit: (e) => {
					e.preventDefault();
					const formData = this.children.FormAuth.children.formBody.props.FormDataProps  as  IFormDataProps
					const btnError = this.children.FormAuth.children.formBody.children.ButtonLogin
					const error = !formData || !formData.name || !formData.email || !formData.login || !formData.surname || !formData.phone || !formData.password || ! formData.passwordRepeat
					if(error ){
						btnError.setProps({ error: 'ошибка', errorText:  'Форма содержит ошибки, submit' });
						return
					}
					btnError.setProps({error: '', errorText: ''})
					console.log('!!!!Данные формы(submit):', formData)
				},
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
