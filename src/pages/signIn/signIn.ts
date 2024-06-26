import { FormLogin, FormWrapper } from '../../components';
import Block, { ICustomError } from '../../core/Block';
import Router from '../../core/Router';
import { SignInData } from '../../core/api/AuthAPI';
import AuthController from '../../core/controllers/AuthController';

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
				formBody: new FormLogin({FormDataProps: {login: '', password: ''}}),
				type: 'signIn',
				onSubmit: (e: Event)=> this.onSubmitHandler(e),
			}),
		});
	}


	onSubmitHandler(event: MouseEvent | Event){
		event.preventDefault();
		const formData = this.children.FormLogin.children.
			formBody.props.FormDataProps  as  IFormDataProps;
		const btnError = this.children.FormLogin.children.
			formBody.children.ButtonLogin;
		if(!formData || !formData.login || !formData.password){
			btnError.setProps({ error: 'ошибка', errorText:  'Форма содержит ошибки, submit' });
			return;
		}
		AuthController.signIn(formData as SignInData)
			.then(() => {
				console.log('Авторизация выполнена успешно');
				new Router().go('/messenger');
			})
			.catch(
				(error: ICustomError) =>{
					if(error.reason === 'User already in system'){
						new Router().go('/messenger');
					}else{
						console.error('Ошибка выполнения запроса регистрации', error);}
				},

			);
		btnError.setProps({error: '', errorText: ''});
		console.log('Данные формы(submit):', formData);
	}

	render():string {
		return `
			<div>
				{{{ FormLogin }}}
			</div>
		`;
	}
}
