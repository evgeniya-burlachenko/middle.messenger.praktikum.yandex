import Block from '../../core/Block';
import { Button } from '../button';
import { Input } from '../input';
import * as validationUtils from '../../utils/validationUtils';
import { navigate } from '../../main';
import { TYPE_BUTTON } from '../button/button';

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
			onBlur: (e: FocusEvent) => onBlurHandler(e, 'email'),
		});
		const InputLogin = new Input({
			label: 'Логин',
			onBlur:  (e: FocusEvent) => onBlurHandler(e, 'login'),
		});
		const InputName = new Input({
			label: 'Имя',
			onBlur:  (e: FocusEvent) => onBlurHandler(e, 'name'),
		});
		const InputSurname = new Input({
			label: 'Фамилия',
			onBlur:  (e: FocusEvent) => onBlurHandler(e, 'surname'),
		});
		const InputProfilePhone = new Input({
			label: 'Телефон',
			onBlur: (e: FocusEvent) => onBlurHandler(e, 'phone'),
		});
		const InputPassword = new Input({
			label: 'Пароль',
			onBlur:  (e: FocusEvent) => onBlurHandler(e, 'password'),
		});
		const InputPasswordRepeat = new Input({
			label: 'Пароль еще раз',
			onBlur: (e: FocusEvent) => onBlurHandler(e, 'passwordRepeat'),
		});
		const ButtonLogin = new Button({
			label: 'Зарегистрироваться',
			type: TYPE_BUTTON.PRIMARY,
			onClick: (e: MouseEvent)=> onLoginHandler(e, 'ButtonLogin'),
		});
		const ButtonCreateAccount = new Button({
			label: 'Войти',
			type: TYPE_BUTTON.LINK,  onClick: ()=> navigate('signIn'),
		});
		const InputEmailLogin = new Input({
			label: 'Почта',
			onBlur: (e: FocusEvent) => onBlurHandler(e, 'email'),
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
		const hasEmptyFields = Object.keys(this.formData).length === 0;
		if(hasErrors || hasEmptyFields){
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
