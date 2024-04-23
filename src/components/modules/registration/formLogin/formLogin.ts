import Block from '../../../../core/Block';
import { Button } from '../../../ui/button';

import * as validationUtils from '../../../../utils/validationUtils';
import { navigate } from '../../../../main';
import { TYPE_BUTTON } from '../../../ui/button/button';
import { Input } from '../../../ui/input/input';
import { INPUT_TYPE } from '../../../ui/input/input/inputElement';

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
			name: INPUT_TYPE.LOGIN,
		});
		const InputPassword = new Input({
			label: 'Пароль',
			onBlur: (e: FocusEvent) => onBlurHandler(e, 'password'),
			name: INPUT_TYPE.PASSWORD,
		});
		const ButtonLogin = new Button({
			label: 'Авторизироваться', type: TYPE_BUTTON.PRIMARY,
			onClick: (e: MouseEvent)=> onSubmitHandler(e, 'ButtonLogin'),
			onSubmit:(e: MouseEvent)=> onSubmitHandler(e, 'ButtonLogin'),
		});
		const ButtonCreateAccount = new Button({
			label: 'Нет аккаунта?',
			style: TYPE_BUTTON.LINK,
			onClick: () => navigate('signUp'),
			type: "submit",
		});

		this.children = {
			...this.children,
			InputLogin,
			InputPassword,
			ButtonLogin,
			ButtonCreateAccount,
		};
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
		const hasEmptyKeys= Object.keys(this.formData).length === 0;
		const hasEmptyFields = Object.values(this.formData).some(value => value.trim() === "");
		if(hasErrors || hasEmptyFields || hasEmptyKeys){
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
			<div class="formLogin-content">
				<div class = "formLogin" >
					<div class="formLogin__fields">
						{{{ InputLogin }}}
						{{{ InputPassword }}}
					</div>
					<div class = "formLogin__button">  
						{{{ ButtonLogin }}}
						{{{ ButtonCreateAccount }}}
					</div>
				</div>
			</div>
        `);

	}
}
