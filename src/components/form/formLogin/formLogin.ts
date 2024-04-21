import Block from '../../../core/Block';
import { Button } from '../../button';
import { Input } from '../../input/input';
import * as validationUtils from '../../../utils/validationUtils';
import { navigate } from '../../../main';
import { TYPE_BUTTON } from '../../button/button';

interface FormData{
	[key: string]: string
}
interface Errors {
	[key: string]: boolean
}
export default class FormLogin extends Block {
	private formData: FormData = {};
	private errors: Errors = {};

	init() {
		const onBlurHandler = this.onBlurHandler.bind(this);
		const onSubmitHandler = this.onSubmitHandler.bind(this);

		const InputLogin = new Input({
			label: 'Логин',
			onBlur:  (e: FocusEvent) => onBlurHandler(e, 'login'),
		});
		const InputPassword = new Input({
			label: 'Пароль',
			onBlur: (e: FocusEvent) => onBlurHandler(e, 'password'),
		});
		const ButtonLogin = new Button({
			label: 'Авторизироваться', type: TYPE_BUTTON.PRIMARY,
			onClick: (e: MouseEvent)=> onSubmitHandler(e, 'ButtonLogin'),
		});
		const ButtonCreateAccount = new Button({
			label: 'Нет аккаунта?',
			type: TYPE_BUTTON.LINK, onClick: ()=> navigate('signUp')});

		this.children = {
			...this.children,
			InputLogin,
			InputPassword,
			ButtonLogin,
			ButtonCreateAccount,
		};
		// const formElement = document.querySelector('.formLogin form');
		// if(formElement){
		// 	formElement.addEventListener('submit',
		// 		(e: Event) => this.onSubmitHandler(e, 'ButtonLogin'));
		// }
	}

	onBlurHandler(e: FocusEvent, field: string){
		const target = e.currentTarget as HTMLInputElement;
		const inputValue = target.value.trim();
		const errors = {...this.errors};
		const validationFunctions:  {[key: string]: (value: string) => boolean}  = {
			login: validationUtils.validateLogin,
			password: validationUtils.validatePassword,
		};
		const validationFunction = validationFunctions[field];

		if(validationFunction){
			errors[field] = !validationFunction(inputValue);
		}
		this.errors = errors;
		this.formData[field] = inputValue;

		const inputComponent = this.children[`Input${field.charAt(0).toUpperCase() + field.slice(1)}`];
		inputComponent.setProps({ error: errors[field], errorText: errors[field] ? 'Форма содержит ошибки. Пожалуйста, исправьте их' : '' });
	}
	onSubmitHandler(event: MouseEvent | Event, field: string){
		event.preventDefault();
		const hasErrors = Object.values(this.errors).some(error=> error);
		const hasEmptyFields = Object.keys(this.formData).length === 0;
		if(hasErrors || hasEmptyFields){
			const component = this.children[field];
			component.setProps({ error: 'ошибка', errorText:  'Форма содержит ошибки. Пожалуйста, исправьте их' });
			return;
		}
		const component = this.children[field];
		component.setProps({ error: false, errorText: '' });

		console.log('Данные формы:', this.formData);
	}

	render() {
		return (`
			<form class="formLogin-content">
				<form class = "formLogin" >
					<div class="formLogin__fields">
						{{{ InputLogin }}}
						{{{ InputPassword }}}
					</div>
					<div class = "formLogin__button">  
						{{{ ButtonLogin }}}
						{{{ ButtonCreateAccount }}}
					</div>
				</form>
			</form>
        `);

	}
}
