import Block from '../../../../core/Block';
import { Button } from '../../../ui/button';

import * as validationUtils from '../../../../utils/validationUtils';
import { Avatar } from '../../../ui/avatar';
import { TYPE_BUTTON } from '../../../ui/button/button';
import { INPUT_TYPE } from '../../../ui/input/input/inputElement';
import avatar from '../../../../assets/icons/profile.svg';

import { IStoreData, IUserData, connect } from '../../../../core/Store';
import emailInput from '../inputs/emailInput';
import loginInput from '../inputs/loginInput';
import firstNameInput from '../inputs/firstNameInput';
import secondNameInput from '../inputs/secondNameInput';
import displayNameInput from '../inputs/displayNameInput';
import phoneInput from '../inputs/phoneInput';

interface IFormData{
	[key: string]: string
}
interface IErrors {
	[key: string]: boolean
}
interface IFormProfileEdit {
	isModalVisible?: boolean;
	FormDataProps?: object;
	currentUser?: IUserData;
}
//сохранение данных у меня происходит по onBlur
//это не всегда корректно, потому что  для сохранения надо сбросить фокус
//если передвигаться табами и энтером, то проблем не заметила
//но я не придумала пока другого решения, а во 2 спринте такой вариант приняли
//в 3 спринте попыталась сосредоточиться на других вещах
//если подойдет такой вариант, то в планах у меня его поправить на доп неделе,
// как и многие другие косяки
//сейчас я сделала доп проверку на кнопку - в какой-то момент она исчезает,
//но если данные без ошибок и фокус был сброшен и данные сохранены
//то она появляется
class FormProfileEdit extends Block{
	private formData: IFormData = {};
	private errors: IErrors = {};

	constructor(props: IFormProfileEdit){

		super({...props,
			isModalVisible: false,
			currentUser: props.currentUser,

			InputProfileEmail: new emailInput({
				label: 'Почта',
				onBlur: (e: FocusEvent) => this.onBlurHandler(e, 'email'),
				value: props.currentUser ? (props.currentUser).email : '',
				disabled: false,
				name: INPUT_TYPE.EMAIL,
			}),
			InputProfileLogin: new loginInput({
				label: 'Логин',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'login'),
				value: props.currentUser ? (props.currentUser).login : '',
				disabled: false,
				name: INPUT_TYPE.LOGIN,
			}),
			InputProfileFirst_name: new firstNameInput({
				label: 'Имя',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'first_name'),
				value: props.currentUser ? (props.currentUser).first_name : '',
				disabled: false,
				name: INPUT_TYPE.FIRST_NAME,
			}),
			InputProfileSecond_name: new secondNameInput({
				label: 'Фамилия',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'second_name'),
				value: props.currentUser ? (props.currentUser).second_name : '',
				disabled: false,
				name: INPUT_TYPE.SECOND_NAME,
			}),
			InputProfileDisplay_name: new displayNameInput({
				label: 'Имя в чате',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'display_name'),
				value: props.currentUser ? (props.currentUser).display_name : '',
				disabled: false,
				name: INPUT_TYPE.DISPLAY_NAME,
			}),
			InputProfilePhone: new phoneInput({
				label: 'Телефон',
				onBlur: (e: FocusEvent) => this.onBlurHandler(e, 'phone'),
				value: props.currentUser ? (props.currentUser).phone : '',
				disabled: false,
				name: INPUT_TYPE.PHONE,
			}),
			ProfileAvatar: new Avatar({
				avatarUrl: props.currentUser ? `https://ya-praktikum.tech/api/v2/resources${(props.currentUser).avatar}`: avatar,
				name: 'avatar',
				onClick: () => this.onAvatarClick(),
				change: false,
			}),
			ButtonChangeData:  new Button({
				label: 'Сохранить',
				style: TYPE_BUTTON.PRIMARY,
				type: 'submit',
			}),
		});
	}

	private onBlurHandler(e: FocusEvent, field: string){
		const target =  e.target as HTMLInputElement;
		const inputValue = target.value.trim();
		const errors = {...this.errors};
		const validationFunctions: {[key: string]: (value: string) => boolean} = {
			email: validationUtils.validateEmail,
			login: validationUtils.validateLogin,
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

		const inputComponent =  this.children?.[`InputProfile${field.charAt(0).toUpperCase() + field.slice(1)}`];

		inputComponent.setProps({ error: errors[field], errorText: errors[field] ? 'Форма содержит ошибки. Пожалуйста, исправьте их' : '' });
		this.props.FormDataProps = this.formData;

	  const hasErrors = Object.values(this.errors).some(error => error);
		const isFormDataEmpty = Object.keys(this.formData).length === 0;
		const buttonChangeData = this.children?.ButtonChangeData;

		if (!hasErrors && !isFormDataEmpty) {
			buttonChangeData.setProps({ disabled: false });
		}
	}
	private onAvatarClick(){
		this.setProps({ isModalVisible: true });
	}

	render(){
		let hasNoErrors;
		const isOnBlurHandlerDefined = typeof this.onBlurHandler === 'function';
		if (this.errors ){
			hasNoErrors = !Object.values(this.errors).some(error => error);
		}

		const btnSbmt = isOnBlurHandlerDefined && hasNoErrors ? '<div class="formProfileEdit__button">{{{ ButtonChangeData }}}</div>' :  'заполните форму перед отправокй';

		return (`
<<<<<<< HEAD
			<div class="formProfileEdit">
					<div class = 'formProfileEdit__btn-back'>
					{{{BackButton}}}
					</div>
=======
				<div class="formProfileEdit">
				
>>>>>>> sprint_3
				<div class = 'formProfileEdit__fields-wrapper'>
				<div class="formProfileEdit__fields"> 
				<div class = "avatar__profile-container">	
						{{{ ProfileAvatar }}}
						</div>
						{{{ InputProfileEmail}}}
						{{{ InputProfileLogin }}}
						{{{ InputProfileFirst_name }}}
						{{{ InputProfileSecond_name }}}
						{{{ InputProfileDisplay_name }}}
						{{{ InputProfilePhone }}}</div>
					${btnSbmt}
					<div>
					</div>
				</div>
			</div>
    	`);
	}
}
const mapStateToProps = (state: IStoreData) => {
	return { currentUser : state.currentUser};
};
export default connect(mapStateToProps)(FormProfileEdit);
