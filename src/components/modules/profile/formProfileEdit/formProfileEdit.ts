import Block, { IComponentProps } from '../../../../core/Block';
import { Button } from '../../../ui/button';

import * as validationUtils from '../../../../utils/validationUtils';
import { Avatar } from '../../../ui/avatar';
import { TYPE_BUTTON } from '../../../ui/button/button';
import { InputProfile } from '../../../ui/input/inputProfile';
import { INPUT_TYPE } from '../../../ui/input/input/inputElement';
import avatar from '../../../../assets/icons/profile.svg'
import { BackButton } from '../../..';
import backArrow from '../../../../assets/icons/arrow-left.svg'
import Router from '../../../../core/Router';
import { IStoreData, IUserData, connect, store } from '../../../../core/Store';

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

class FormProfileEdit extends Block{
	private formData: IFormData = {};
	private errors: IErrors = {};

	constructor(props: IFormProfileEdit){

		super({...props,
			isModalVisible: false,
			currentUser: props.currentUser,
	//почему не могу воспользоваться  currentUser после перезагрузки
			InputProfileEmail: new InputProfile({
				label: 'Почта',
				onBlur: (e: FocusEvent) => this.onBlurHandler(e, 'email'),
				value: `${store.getState().currentUser?.email}`,
				disabled: false,
				name: INPUT_TYPE.EMAIL,
			}),
			InputProfileLogin: new InputProfile({
				label: 'Логин',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'login'),
				value: props.currentUser ? (props.currentUser as IUserData).login : "",
				disabled: false,
				name: INPUT_TYPE.LOGIN,
			}),
			InputProfileFirst_name: new InputProfile({
				label: 'Имя',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'first_name'),
				value: props.currentUser ? (props.currentUser as IUserData).first_name : "",
				disabled: false,
				name: INPUT_TYPE.FIRST_NAME,
			}),
			InputProfileSecond_name: new InputProfile({
				label: 'Фамилия',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'second_name'),
				value: props.currentUser ? (props.currentUser as IUserData).second_name : "",
				disabled: false,
				name: INPUT_TYPE.SECOND_NAME,
			}),
			InputProfileDisplay_name: new InputProfile({
				label: 'Имя в чате',
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'display_name'),
				value: props.currentUser ? (props.currentUser as IUserData).display_name : "",
				disabled: false,
				name: INPUT_TYPE.DISPLAY_NAME,
			}),
			InputProfilePhone: new InputProfile({
				label: 'Телефон',
				onBlur: (e: FocusEvent) => this.onBlurHandler(e, 'phone'),
				value: props.currentUser ? (props.currentUser as IUserData).phone : "",
				disabled: false,
				name: INPUT_TYPE.PHONE,
			}),
			ProfileAvatar: new Avatar({
				avatarUrl: avatar,
				name: 'avatar',
				onClick: () => this.onAvatarClick(),
				change: false,
			}),
			ButtonChangeData:  new Button({
				label: 'Сохранить',
				style: TYPE_BUTTON.PRIMARY,
				type: 'submit',
			}),
			BackButton: new BackButton({
				...props,
				src: backArrow,
				onClick: () => new Router().go('/messenger'),
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
		this.props.FormDataProps = this.formData
	}
	private onAvatarClick(){
		this.setProps({ isModalVisible: true });
	}

	render(){
		const email = !this.props.currentUser ? " " : (this.props.currentUser as IUserData).email;
		console.log("!!email", email)
		return (`
				<div class="formProfileEdit">
					<div class = 'formProfileEdit__btn-back'>
					{{{BackButton}}}
					</div>
				<div class = 'formProfileEdit__fields-wrapper'>
				<div class="formProfileEdit__fields"> 
						{{{ ProfileAvatar }}}
						{{{ InputProfileEmail}}}
						{{{ InputProfileLogin }}}
						{{{ InputProfileFirst_name }}}
						{{{ InputProfileSecond_name }}}
						{{{ InputProfileDisplay_name }}}
						{{{ InputProfilePhone }}}</div>
						<div class = "formProfileEdit__button">
							{{{ ButtonChangeData }}}
						</div>
					<div>
					</div>
				</div>
			</div>
    	`);
	}
}
const mapStateToProps = (state: IStoreData) => {
	return { currentUser : state.currentUser}
}
export default connect(mapStateToProps)(FormProfileEdit)