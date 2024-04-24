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

export default class FormAuth extends Block {
	private formData: FormData = {};
	private errors: Errors = {};

	init() {
		const onBlurHandler = this.onBlurHandler.bind(this);
		const onLoginHandler = this.onLoginHandler.bind(this);

		const InputEmail = new Input({
			label: 'Почта',
			name: INPUT_TYPE.EMAIL,
			onBlur: (e: FocusEvent) => onBlurHandler(e, 'email'),
		});
		const InputLogin = new Input({
			label: 'Логин',
			name: INPUT_TYPE.LOGIN,
			onBlur:  (e: FocusEvent) => onBlurHandler(e, 'login'),
		});
		const InputName = new Input({
			label: 'Имя',
			name: INPUT_TYPE.FIRST_NAME,
			onBlur:  (e: FocusEvent) => onBlurHandler(e, 'name'),
		});
		const InputSurname = new Input({
			label: 'Фамилия',
			name: INPUT_TYPE.SECOND_NAME,
			onBlur:  (e: FocusEvent) => onBlurHandler(e, 'surname'),
		});
		const InputProfilePhone = new Input({
			label: 'Телефон',
			name: INPUT_TYPE.PHONE,
			onBlur: (e: FocusEvent) => onBlurHandler(e, 'phone'),
		});
		const InputPassword = new Input({
			label: 'Пароль',
			name: INPUT_TYPE.PASSWORD,
			type: 'password',
			onBlur:  (e: FocusEvent) => onBlurHandler(e, 'password'),
		});
		const InputPasswordRepeat = new Input({
			label: 'Пароль еще раз',
			name: INPUT_TYPE.PASSWORD,
			type: 'password',
			onBlur: (e: FocusEvent) => onBlurHandler(e, 'passwordRepeat'),
		});
		const ButtonLogin = new Button({
			label: 'Зарегистрироваться',
			style: TYPE_BUTTON.PRIMARY,
			onClick: (e: MouseEvent)=> onLoginHandler(e, 'ButtonLogin'),
			type: "submit",
		});
		const ButtonCreateAccount = new Button({
			label: 'Войти',
			style: TYPE_BUTTON.LINK,
			onClick: ()=> navigate('signIn'),
		});
		const InputEmailLogin = new Input({
			label: 'Почта',
			onBlur: (e: FocusEvent) => onBlurHandler(e, 'email'),
			name: INPUT_TYPE.EMAIL,
		});
		this.children = {
			...this.children,
			InputEmail,
			InputLogin,
			InputName,
			InputSurname,
			InputPassword,
			InputProfilePhone,
			InputPasswordRepeat,
			ButtonLogin,
			ButtonCreateAccount,
			InputEmailLogin,
		};
	}

	onBlurHandler(e: FocusEvent, field: string){
		const target = e.currentTarget as HTMLInputElement;
		const inputValue = target.value.trim();
		const errors = {...this.errors};
		let password;

		switch(field){
		case 'email':
			errors[field] =!validationUtils.validateEmail(inputValue);
			break;
		case 'login':
			errors[field] = !validationUtils.validateLogin(inputValue);
			break;
		case 'name':
		case 'surname':
			errors[field] = !validationUtils.validateName(inputValue);
			break;
		case 'phone':
			password = this.formData.password;
			errors[field] = !validationUtils.validatePhone(inputValue);
			break;
		case 'password':
			errors[field] = !validationUtils.validatePassword(inputValue);
			break;
		case 'passwordRepeat':
			password = this.formData.password;
			errors[field] = !validationUtils.validatePasswordRepeat(password, inputValue);
			break;
		default:
			break;
		}
		this.errors = errors;
		this.formData[field] = inputValue;
		const inputKey = `Input${field.charAt(0).toUpperCase() + field.slice(1)}`;
		const inputComponent = this.children[inputKey];
		inputComponent.setProps({ error: errors[field], errorText: errors[field] ? 'Форма содержит ошибки. Пожалуйста, исправьте их' : '' });
	}

	onLoginHandler(event: MouseEvent, field: string){
		event.preventDefault();
		const hasErrors = Object.values(this.errors).some(error=> error);
		const hasEmptyKeys = Object.keys(this.formData).length === 0;
		const hasEmptyFields = Object.values(this.formData).some(value => value.trim() === "");
		if(hasErrors || hasEmptyFields || hasEmptyKeys){
			const component = this.children[field];
			component.setProps({ error: 'ошибка', errorText: 'Форма содержит ошибки. Пожалуйста, исправьте их' });
			return;
		}
		const component = this.children[field];
		component.setProps({ error: false, errorText: '' });
		console.log('Данные формы:', this.formData);
	}
	render() {
		return (`
			<div class = 'formAuth'>
				<div class = 'form__content'>
					{{{ InputEmail }}}
					{{{ InputLogin }}}
					{{{ InputName }}}
					{{{ InputSurname }}}
					{{{ InputProfilePhone }}}
					{{{ InputPassword }}}
					{{{ InputPasswordRepeat }}}
				</div>
				<div class = 'formAuth__button'>  
					{{{ ButtonLogin }}}
					{{{ ButtonCreateAccount }}}
				</div>
			</div>
		`);
	}
}
