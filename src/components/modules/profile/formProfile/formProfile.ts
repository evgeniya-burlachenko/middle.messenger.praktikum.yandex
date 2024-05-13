import Block, { IComponentProps } from '../../../../core/Block';
import { Button } from '../../../ui/button';
import { Avatar, BackButton } from '../../..';
import { Download } from '../../../../pages';
import { TYPE_BUTTON } from '../../../ui/button/button';
import { INPUT_TYPE } from '../../../ui/input/input/inputElement';
import avatarImg from '../../../../assets/icons/profile.svg'
import backArrow from '../../../../assets/icons/arrow-left.svg'
import Router from '../../../../core/Router';
import AuthController from '../../../../core/controllers/AuthController';
import { IStoreData, IUserData, connect, store } from '../../../../core/Store';
import FirstNameInput from '../inputs/firstNameInput';
import LoginInput from '../inputs/loginInput';
import PhoneInput from '../inputs/phoneInput';
import secondNameInput from '../inputs/secondNameInput';
import emailInput from '../inputs/emailInput';
import displayNameInput from '../inputs/displayNameInput';
interface IFormProfile {


}
class FormProfile extends Block {
	constructor(props: IFormProfile & {currentUser?: any}){
		super({...props,
			isModalVisible: false,
			currentUser: props.currentUser,

		});
	}

	init() {
		console.log("!!!ListCardsHTML",  this.children)
		const onAvatarClick = this.onAvatarClick.bind(this);
		const onExitClick = this.onExitClick.bind(this)
		const avatarUrl = this.props.currentUser ? `https://ya-praktikum.tech/api/v2/resources${(this.props.currentUser as IUserData).avatar}`: avatarImg

		const InputProfileEmail = new emailInput({
			label: 'Почта',
			value: this.props.currentUser? (this.props.currentUser as IUserData).email : "",
			disabled: true,
			name: INPUT_TYPE.EMAIL,
		});

		const InputProfileLogin = new LoginInput({
			label: 'Логин',
			value: this.props.currentUser ?(this.props.currentUser as IUserData).login : "",
			disabled: true,
			name: INPUT_TYPE.LOGIN,
		});

		const InputProfileName = new FirstNameInput({
			label: 'Имя',
			value: this.props.currentUser ? (this.props.currentUser as IUserData).first_name : "",
			disabled: true,
			name: INPUT_TYPE.FIRST_NAME,
		});

		const InputProfileSurname = new secondNameInput({
			label: 'Фамилия',
			value: this.props.currentUser ? (this.props.currentUser as IUserData).second_name : "",
			disabled: true,
			name: INPUT_TYPE.SECOND_NAME,
		});
		const InputProfileDisplayName = new displayNameInput({
			label: 'Имя в чате',
			value: this.props.currentUser ? (this.props.currentUser as IUserData).display_name : "",
			disabled: true,
			name: INPUT_TYPE.DISPLAY_NAME,
		});
		const InputProfilePhone = new PhoneInput({
			label: 'Телефон',
			value:this.props.currentUser ? (this.props.currentUser as IUserData).phone : "",
			disabled: true,
			name: INPUT_TYPE.PHONE,
		});
		const ProfileAvatar = new Avatar({
			avatarUrl: avatarUrl,
			name: 'avatar',
			onClick: () => onAvatarClick(),
			change: true,
		});
		const ButtonChangeData =  new Button({
			label: 'Изменить данные',
			style: TYPE_BUTTON.LINK,
			onClick: () => new Router().go('/settings-edit')
		});

		const ButtonChangePassword =  new Button({
			label: 'Изменить пароль',
			style: TYPE_BUTTON.LINK,
			onClick: () => new Router().go('/password-edit')
		});
		const ButtonExit =  new Button({
			label: 'Выход',
			style: TYPE_BUTTON.ATTENTION,
			onClick: () => onExitClick()
		});


		const DownloadAvatar = new Download({});
		const BackButtonArrow =  new BackButton({
			src: backArrow,
			onClick: () => new Router().go('/messenger')
		});

		this.children = {
			...this.children,
			ProfileAvatar,
			InputProfileEmail,
			InputProfileLogin,
			InputProfileName,
			InputProfileSurname,
			InputProfileDisplayName,
			InputProfilePhone,
			DownloadAvatar,
			ButtonChangePassword,
			ButtonChangeData,
			ButtonExit,
			BackButtonArrow,

		};
	}
	componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps ): boolean {
		if(oldProps === newProps){
		  return false;
		}
		this.children.ProfileAvatar.setProps({avatarUrl: `https://ya-praktikum.tech/api/v2/resources${newProps.currentUser.avatar}` });

		return true;
	
	  }
	onExitClick() {
		AuthController.logout().then(() => {
		  store.clearUserInfo();
		  const router = new Router();
		  router.go('/sign-in');
		}).catch((error) => console.error(`Ошибка выполнения запроса /logout! ${error ? error.reason : ''}`));
	  }

	onAvatarClick(){
		this.setProps({ isModalVisible: true });

	}

	render() {
		const { isModalVisible } = this.props;

		return (`
        <div class="formProfile">
			<div class = 'formProfile__btn-back'>
					{{{BackButtonArrow}}}
			</div>
			<div class = 'formProfile__fields-wrapper'>
				<div class = "formProfile__fields"> 
				<div class = "avatar__profile-container">	
					{{{ ProfileAvatar }}}
					</div>
					{{{ InputProfileEmail }}}
					{{{ InputProfileLogin }}}
					{{{ InputProfileName }}}
					{{{ InputProfileSurname }}}
					{{{ InputProfileDisplayName }}}
					{{{ InputProfilePhone }}}
					<div class="formProfile__buttons">	
					{{{ ButtonChangeData }}}
					{{{ ButtonChangePassword }}}
					{{{ ButtonExit }}}
				</div> 
			</div>
			</div>
			

			<div class="formProfile__modalChange">   
				${isModalVisible ? `
					{{{ DownloadAvatar }}}
			
				
				` : ''}
			</div>
        </div>
    `);
	}
}
const mapStateToProps = (state: IStoreData) => {
	return { currentUser : state.currentUser}
}
export default  connect(mapStateToProps)(FormProfile)
