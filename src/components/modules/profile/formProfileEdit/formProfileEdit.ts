import Block from '../../../../core/Block';
import { Button } from '../../../ui/button';

import * as validationUtils from '../../../../utils/validationUtils';
import { Avatar } from '../../../ui/avatar';
import { TYPE_BUTTON } from '../../../ui/button/button';
import { InputProfile } from '../../../ui/input/inputProfile';
import { INPUT_TYPE } from '../../../ui/input/input/inputElement';

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
				name: INPUT_TYPE.EMAIL,
			}),
			InputProfileLogin: new InputProfile({
				label: 'Логин',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'login'),
				value: 'ivanivanov',
				disabled: false,
				name: INPUT_TYPE.LOGIN,
			}),
			InputProfileName: new InputProfile({
				label: 'Имя',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'name'),
				value: 'Иван',
				disabled: false,
				name: INPUT_TYPE.FIRST_NAME,
			}),
			InputProfileSecondname: new InputProfile({
				label: 'Фамилия',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'secondname'),
				value: 'Иванов',
				disabled: false,
				name: INPUT_TYPE.SECOND_NAME,
			}),
			InputProfileDisplayName: new InputProfile({
				label: 'Имя в чате',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'displayName'),
				value: 'Иван',
				disabled: false,
				name: INPUT_TYPE.DISPLAY_NAME,
			}),
			InputProfilePhone: new InputProfile({
				label: 'Телефон',
				onBlur: (e: FocusEvent) => this.onBlurHandler(e, 'phone'),
				value: '+7(909)9673030',
				disabled: false,
				name: INPUT_TYPE.PHONE,
			}),
			ProfileAvatar: new Avatar({
				avatarUrl: '/assets/icons/profile.svg',
				name: 'avatar',
				onClick: () => this.onAvatarClick(),
				change: false,
			}),
			ButtonChangeData:  new Button({
				label: 'Сохранить',
				style: TYPE_BUTTON.PRIMARY,
				onClick: (e: MouseEvent)=> this.onSubmitHandler(e, 'ButtonChangeData'),
				onSubmit: (e: MouseEvent)=> this.onSubmitHandler(e, 'ButtonChangeData'),
			}),
		});
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
		const hasEmptyKeys = Object.keys(this.formData).length === 0;
		const hasEmptyFields = Object.values(this.formData).some(value => value.trim() === "");
		if(hasErrors || hasEmptyFields || hasEmptyKeys){
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
				</div>
				
    	`);
	}
}
