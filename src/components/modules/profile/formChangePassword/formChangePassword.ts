import Block from '../../../../core/Block';
import { Button } from '../../../ui/button';

import * as validationUtils from '../../../../utils/validationUtils';
import { Avatar } from '../../../ui/avatar';
import { TYPE_BUTTON } from '../../../ui/button/button';
import { InputProfile } from '../../../ui/input/inputProfile';
import { INPUT_TYPE } from '../../../ui/input/input/inputElement';
import avatar from '../../../../assets/icons/profile.svg'
interface FormData{
	[key: string]: string
}
interface Errors {
	[key: string]: boolean
}

interface IFormChangePassword{
	// FormData?: object

}
export default class FormChangePassword extends Block {
	private formData: FormData = {};
	private errors: Errors = {};
	constructor(props: IFormChangePassword){
		super({...props,
			isModalVisible: false});

	}
	init() {
		const onBlurHandler = this.onBlurHandler.bind(this);
		const onAvatarClick = this.onAvatarClick.bind(this);

		const InputOldPassword = new InputProfile({
			label: 'Старый пароль',
			value: '',
			type: 'password',
			name: INPUT_TYPE.PASSWORD,
		});

		const InputPasswordPassword = new InputProfile({
			label: 'Новый пароль',
			onBlur:  (e: FocusEvent) => onBlurHandler(e, INPUT_TYPE.PASSWORD),
			type: 'password',
			name: INPUT_TYPE.PASSWORD,
		});

		const InputPasswordRepeat = new InputProfile({
			label: 'Пароль еще раз',
			onBlur: (e: FocusEvent) => onBlurHandler(e, 'repeat'),
			type: 'password',
			name: INPUT_TYPE.PASSWORD,
		});

		const ProfileAvatar = new Avatar({
			avatarUrl: avatar,
			name: 'avatar',
			onClick: onAvatarClick,
			change: false,
		});
		const ButtonSaveData =  new Button({
			label: 'Сохранить',
			style: TYPE_BUTTON.PRIMARY,
			type: 'submit',
			// onClick: (e: MouseEvent) => onLoginHandler(e, 'ButtonSaveData'),
		});

		this.children = {
			...this.children,
			ProfileAvatar,
			InputPasswordPassword,
			InputOldPassword,
			InputPasswordRepeat,
			ButtonSaveData,
		};
	}

	onBlurHandler(e: FocusEvent, field: string){
		const target = e.target as HTMLInputElement;
		const inputValue = target.value.trim();
		const errors = {...this.errors};
		let password;
		switch(field){
		case 'password':
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

		this.props.FormDataProps =  this.formData
	}
	onAvatarClick(){
		this.setProps({ isModalVisible: true });
	}

	render() {
		return (`
        <div class='formChangePassword' id="134">
			<div class = 'formChangePassword__fields'>
				{{{ ProfileAvatar }}}
				{{{ InputOldPassword }}}
				{{{ InputPasswordPassword }}}
				{{{ InputPasswordRepeat }}}
				{{{ButtonArrowLeft}}}
			<div>
			<div class = 'formChangePassword__button'>  
				{{{ ButtonSaveData }}}
			</div>
			</div>
        </div>
    `);
	}
}
