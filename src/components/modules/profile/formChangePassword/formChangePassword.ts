import Block, { IComponentProps } from '../../../../core/Block';
import { Button } from '../../../ui/button';

import * as validationUtils from '../../../../utils/validationUtils';
import { Avatar } from '../../../ui/avatar';
import { TYPE_BUTTON } from '../../../ui/button/button';
import { InputProfile } from '../../../ui/input/inputProfile';
import { INPUT_TYPE } from '../../../ui/input/input/inputElement';
import avatar from '../../../../assets/icons/profile.svg';

import { IStoreData, IUserData, connect } from '../../../../core/Store';
interface FormData{
	[key: string]: string
}
interface Errors {
	[key: string]: boolean
}

interface IFormChangePassword{

}

class FormChangePassword extends Block {
	private formData: FormData = {};
	private errors: Errors = {};
	constructor(props: IFormChangePassword){
		super({...props,
			isModalVisible: false});

	}
	init() {
		const onBlurHandler = this.onBlurHandler.bind(this);
		const onAvatarClick = this.onAvatarClick.bind(this);
		const avatarUrl = this.props.currentUser ? `https://ya-praktikum.tech/api/v2/resources${(this.props.currentUser as IUserData).avatar}`: avatar;
		const InputOldPassword = new InputProfile({
			label: 'Старый пароль',
			onBlur:  (e: FocusEvent) => onBlurHandler(e, INPUT_TYPE.OLD_PASSWORD),
			type: 'password',
			name: INPUT_TYPE.PASSWORD,
		});

		const InputPasswordPassword = new InputProfile({
			label: 'Новый пароль',
			onBlur:  (e: FocusEvent) => onBlurHandler(e, INPUT_TYPE.NEW_PASSWORD),
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
			avatarUrl: avatarUrl,
			name: 'avatar',
			onClick: onAvatarClick,
			change: false,
		});
		const ButtonSaveData =  new Button({
			label: 'Сохранить',
			style: TYPE_BUTTON.PRIMARY,
			type: 'submit',
		});


		this.children = {
			...this.children,
			ProfileAvatar,
			InputPasswordPassword,
			InputOldPassword,
			InputPasswordRepeat,
			ButtonSaveData,
			// BackButtonArrow,
		};
	}
	componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps ): boolean {
		if(oldProps === newProps){
		  return false;
		}
		this.children.ProfileAvatar.setProps({avatarUrl: `https://ya-praktikum.tech/api/v2/resources${(newProps.currentUser as IUserData ).avatar}` });

		return true;
	}
	onBlurHandler(e: FocusEvent, field: string){
		const target = e.target as HTMLInputElement;
		const inputValue = target.value.trim();
		const errors = {...this.errors};
		let password;
		switch(field){
		case 'oldPassword':
			errors[field] = !validationUtils.validatePassword(inputValue);
			break;
		case 'newPassword':
			errors[field] = !validationUtils.validatePassword(inputValue);
			break;
		case 'repeat':
			password = this.formData.newPassword;
			errors[field] = !validationUtils.validatePasswordRepeat(password, inputValue);
			break;
		default:
			break;
		}
		this.errors = errors;
		this.formData[field] = inputValue;
		console.log('!!1this.formData', this.formData);
		console.log('!!1field', field);
		// mannayamashaQWERTY12345!
		// 111aaaQQQ
		const inputComponent = this.children[`InputPassword${field.charAt(0).toUpperCase() + field.slice(1)}`];
		inputComponent.setProps({ error: errors[field], errorText: errors[field] ? 'some error' : '' });

		this.props.FormDataProps =  this.formData;
	}
	onAvatarClick(){
		this.setProps({ isModalVisible: true });
	}

	render() {
		let hasNoErrors;
		const isOnBlurHandlerDefined = typeof this.onBlurHandler === 'function';
		if (this.errors ){
			hasNoErrors = !Object.values(this.errors).some(error => error);
		}

		const btnSbmt = isOnBlurHandlerDefined && hasNoErrors ? '		<div class = \'formChangePassword__button\'>  {{{ ButtonSaveData }}}</div>' :  'заполните форму перед отправокй';
		return (`
        <div class='formChangePassword' id="134">
			

			<div class = 'formChangePassword__fields-wrapper'>
			<div class = 'formChangePassword__fields'>
			<div class = "avatar__profile-container">	
				{{{ ProfileAvatar }}}
			</div>
				{{{ InputOldPassword }}}
				{{{ InputPasswordPassword }}}
				{{{ InputPasswordRepeat }}}
				{{{ButtonArrowLeft}}}
		
			<div>
		
				${btnSbmt}
		
			</div>
			<div>
        </div>
    `);
	}
}
const mapStateToProps = (state: IStoreData) => {
	return { currentUser : state.currentUser};
};
export default  connect(mapStateToProps)(FormChangePassword);
