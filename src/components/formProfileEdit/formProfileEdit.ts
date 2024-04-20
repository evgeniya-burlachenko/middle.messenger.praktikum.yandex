import Block from '../../core/Block';
import { Button } from '../button';
import { InputProfile } from '../inputProfile';
import * as validationUtils from '../../utils/validationUtils';
import { Avatar } from '../avatar';
import { TYPE_BUTTON } from '../button/button';

interface IFormData{
	[key: string]: string
}
interface IErrors {
	[key: string]: boolean
}
interface IFormProfileEdit {
	isModalVisible?: boolean;
}

export default class FormProfileEdit extends Block{
	private formData: IFormData = {};
	private errors: IErrors = {};

	constructor(props: IFormProfileEdit){
		super({...props,
			isModalVisible: false,
			InputProfileEmail: new InputProfile({
				label: 'Почта',
				onBlur: (e: FocusEvent) => this.onBlurHandler(e, 'email'),
				value: 'pochta@yandex.ru',
				disabled: false,
			}),
			InputProfileLogin: new InputProfile({
				label: 'Логин',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'login'),
				value: 'ivanivanov',
				disabled: false,
			}),
			InputProfileName: new InputProfile({
				label: 'Имя',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'name'),
				value: 'Иван',
				disabled: false,
			}),
			InputProfileSecondname: new InputProfile({
				label: 'Фамилия',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'secondname'),
				value: 'Иванов',
				disabled: false,
			}),
			InputProfileDisplayName: new InputProfile({
				label: 'Имя в чате',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'displayName'),
				value: 'Иван',
				disabled: false,
			}),
			InputProfilePhone: new InputProfile({
				label: 'Телефон',
				onBlur: (e: FocusEvent) => this.onBlurHandler(e, 'phone'),
				value: '+7(909)9673030',
				disabled: false,
			}),
			ProfileAvatar: new Avatar({
				avatarUrl: '/assets/profile.svg',
				name: 'avatar',
				onClick: () => this.onAvatarClick(),
				change: false,
			}),
			ButtonChangeData:  new Button({
				label: 'Сохранить',
				type: TYPE_BUTTON.PRIMARY,
				onClick: (e: MouseEvent)=> this.onSubmitHandler(e, 'ButtonChangeData'),
			}),
		});
		const formElement = document.querySelector('.formProfile form');
		if(formElement){
			formElement.addEventListener('submit',
				(e) => this.onSubmitHandler(e, 'ButtonChangeData'));
		}
	}

	private onBlurHandler(e: FocusEvent, field: string){
		const target =  e.target as HTMLInputElement;
		const inputValue = target.value.trim();
		const errors = {...this.errors};
		const validationFunctions: {[key: string]: (value: string) => boolean} = {
			email: validationUtils.validateEmail,
			name: validationUtils.validateName,
			secondname: validationUtils.validateName,
			phone: validationUtils.validatePhone,
		};
		const validationFunction = validationFunctions[field];
		if(validationFunction){
			errors[field] = !validationFunction(inputValue);
		}
		this.errors = errors;
		this.formData[field] = inputValue;
		const inputString = `InputProfile${field.charAt(0).toUpperCase() + field.slice(1)}`;
		const inputComponent =  this.children?.[inputString];
		// const inputComponent =  (this as {children?: Partial<IComponents>}).children?.[inputString];
		if(inputComponent){
			inputComponent.setProps({ error: errors[field], errorText: errors[field] ?
				'Форма содержит ошибки' : '' });
		}
	}
	private onAvatarClick(){
		this.setProps({ isModalVisible: true });
	}
	private onSubmitHandler(event: MouseEvent | Event, field: string){
		event.preventDefault();
		const hasErrors = Object.values(this.errors).some(error=> error);
		const hasEmptyFields = Object.keys(this.formData).length === 0;
		if(hasErrors || hasEmptyFields){
			const component =  this.children?.[field];
			if(component){
				component.setProps({
					error: 'ошибка',
					errorText: 'Форма содержит ошибки или не было изменений',
				});
			}
			return;
		}
		const component = this.children?.[field];
		if(component) {
			component.setProps({ error: false, errorText: '' });
			console.log('Данные формы:', this.formData);
			//  PATCH
		}
	}
	render(){
		return (`
			<div class="formProfile">
				<form>
					<div class="formProfile__fields"> 
							{{{ ProfileAvatar }}}
							{{{ InputProfileEmail }}}
							{{{ InputProfileLogin }}}
							{{{ InputProfileName }}}
							{{{ InputProfileSecondName }}}
							{{{ InputProfileDisplayName }}}
							{{{ InputProfilePhone }}}</div>
						<div>
						<div class = "formProfile__button">
							{{{ ButtonChangeData }}}
						</div>
					</div>
				</form>
				
    	`);
	}
}
