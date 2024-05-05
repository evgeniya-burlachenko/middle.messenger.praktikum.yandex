import { FormAuth, FormWrapper } from '../../components';
import Block from '../../core/Block';
import Router from '../../core/Router';
import { SignUpData } from '../../core/api/AuthAPI';
import AuthController from '../../core/controllers/AuthController';

export interface IAuthPageProps {
}
export  interface IFormDataProps{
	login?: string,
	first_name?: string,
	email?: string,
	second_name?: string,
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
				onSubmit: async (e: Event)=> await this.onSubmitHandler(e),
			}),
		});
	}
	async componentDidMount() {
		try{
		console.log("componentDidMount")
		await AuthController.fetchUser()
		  const router = new Router();
		  router.go('/messenger');
		}catch(error){
			console.error("Error fetching")
		}

		
	  }
	async onSubmitHandler(event: MouseEvent | Event){
		event.preventDefault();
		const formData = this.children.FormAuth.children.formBody.props.FormDataProps  as  IFormDataProps
		const btnError = this.children.FormAuth.children.formBody.children.ButtonLogin
		const error = !formData || !formData.first_name || !formData.email || !formData.login || !formData.second_name || !formData.phone || !formData.password || ! formData.passwordRepeat
		if(error ){
			btnError.setProps({ error: 'ошибка', errorText:  'Форма содержит ошибки, submit' });
			return
		}
		try{
			await AuthController.signUp(formData as SignUpData);
			new Router().go('/messenger');
			btnError.setProps({error: '', errorText: ''})
			console.log('!!!Данные формы(submit):', formData)
		}catch{
				console.error("!!Ошибка выполнения запроса регистрации", error)
			}
		
	
	}

	render(): string {
		return `
			<div>
				{{{ FormAuth }}}
			</div>
        `;
	}
}
