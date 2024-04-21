import Block from '../../../core/Block';
import { Button } from '../../button';
import { InputProfile } from '../../input/inputProfile';
import * as validationUtils from '../../../utils/validationUtils';
import { Avatar } from '../../avatar';
import { TYPE_BUTTON } from '../../button/button';

interface FormData{
	[key: string]: string
}
interface Errors {
	[key: string]: boolean
}

interface IFormProfileEdit{

}
export default class FormProfileEdit extends Block {
	private formData: FormData = {};
	private errors: Errors = {};
	constructor(props: IFormProfileEdit){
		super({...props,
			isModalVisible: false});

	}
	init() {
		const onBlurHandler = this.onBlurHandler.bind(this);
		const onAvatarClick = this.onAvatarClick.bind(this);
		const onLoginHandler = this.onLoginHandler.bind(this);

		const InputOldPassword = new InputProfile({
			label: 'Старый пароль',
			// onBlur:  (e: FocusEvent) => onBlurHandler(e, 'oldPassword'),
			value: '',
			type: 'password',
		});

		const InputPasswordNew = new InputProfile({
			label: 'Новый пароль',
			onBlur:  (e: FocusEvent) => onBlurHandler(e, 'new'),
			type: 'password',
		});

		const InputPasswordRepeat = new InputProfile({
			label: 'Пароль еще раз',
			onBlur: (e: FocusEvent) => onBlurHandler(e, 'repeat'),
			type: 'password',
		});

		const ProfileAvatar = new Avatar({
			avatarUrl: '/assets/profile.svg',
			name: 'avatar',
			onClick: onAvatarClick,
			change: false,
		});
		const ButtonSaveData =  new Button({
			label: 'Сохранить', type: TYPE_BUTTON.PRIMARY,
			onClick: (e: MouseEvent)=> onLoginHandler(e, 'ButtonSaveData'),

		});
		// const ButtonArrowLeft =  new Button({
		// 	label: '1',
		// 	type: 'button-arrow__left',
		// 	onClick: (e: MouseEvent)=> onLoginHandler(e, 'ButtonChangeData'),

		// });

		// const DownloadAvatar = new Download({})

		this.children = {
			...this.children,
			ProfileAvatar,
			InputPasswordNew,
			InputOldPassword,
			InputPasswordRepeat,
			ButtonSaveData,
			// ButtonArrowLeft,

		};
	}

	onBlurHandler(e: FocusEvent, field: string){
		const target = e.target as HTMLInputElement;
		const inputValue = target.value.trim();
		const errors = {...this.errors};
		let password;
		switch(field){
		case 'new':
			errors[field] = !validationUtils.validatePassword(inputValue);
			break;
		case 'repeat':
			password = this.formData.password;
			errors[field] = !validationUtils.validatePasswordRepeat(password, inputValue);
			break;
		default:
			break;
		}
		this.errors = errors;
		this.formData[field] = inputValue;

		const inputComponent = this.children[`InputPassword${field.charAt(0).toUpperCase() + field.slice(1)}`];
		inputComponent.setProps({ error: errors[field], errorText: errors[field] ? 'some error' : '' });
	}
	onAvatarClick(){
		this.setProps({ isModalVisible: true });
	}
	onLoginHandler(event: MouseEvent, field: string){
		event.preventDefault();
		const hasErrors = Object.values(this.errors).some(error=> error);
		const hasEmptyFields = Object.keys(this.formData).length === 0;

		if(hasErrors || hasEmptyFields){
			const component = this.children[field];
			component.setProps({ error: 'ошибка', errorText: 'Форма содержит ошибки или не было изменений' });
			return;
		}
		const component = this.children[field];
		component.setProps({ error: false, errorText: '' });

		console.log('Данные формы:', this.formData);
	}

	render() {
		return (`
        <form class='formChangePassword'>
			<form class = 'formChangePassword__fields'>
				{{{ ProfileAvatar }}}
				{{{ InputOldPassword }}}
				{{{ InputPasswordNew }}}
				{{{ InputPasswordRepeat }}}
				{{{ButtonArrowLeft}}}
			<div>
			<div class = 'formChangePassword__button'>  
				{{{ ButtonSaveData }}}
			</div>
			</div>
        </form>
    `);
	}
}
