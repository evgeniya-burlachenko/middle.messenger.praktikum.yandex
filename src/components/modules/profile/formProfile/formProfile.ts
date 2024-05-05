import Block, { IComponentProps } from '../../../../core/Block';
import { Button } from '../../../ui/button';

// import { navigate } from '../../../../main';
import { Avatar, BackButton } from '../../..';
import { Download } from '../../../../pages';
import { TYPE_BUTTON } from '../../../ui/button/button';
import { InputProfile } from '../../../ui/input/inputProfile';
import { INPUT_TYPE } from '../../../ui/input/input/inputElement';
import avatarImg from '../../../../assets/icons/profile.svg'
import backArrow from '../../../../assets/icons/arrow-left.svg'
import Router from '../../../../core/Router';
import AuthController from '../../../../core/controllers/AuthController';
import { IStoreData, IUserData, connect, store } from '../../../../core/Store';
interface IFormProfile {
	// id?: string;
	// email?: string;
	// login?: string;
	// first_name?: string;
	// second_name?: string;
	// display_name?: string;
	// phone?: string;
	// avatar?: string;

}
class FormProfile extends Block {
	constructor(props: IFormProfile & {currentUser?: any}){
		super({...props,
			isModalVisible: false,
			currentUser: props.currentUser,

		
		});
	
	//почему не могу воспользоваться  currentUser?
	console.log("!!!currentUser", this.props)
	console.log("!!! store.getState()", store.getState())
	}

	init() {
		const onAvatarClick = this.onAvatarClick.bind(this);
		const onExitClick = this.onExitClick.bind(this)


		const InputProfileEmail = new InputProfile({
			label: 'Почта',
			value: this.props.currentUser? (this.props.currentUser as IUserData).email : "",
			disabled: true,
			name: INPUT_TYPE.EMAIL,
		});

		const InputProfileLogin = new InputProfile({
			label: 'Логин',
			value: this.props.currentUser ?(this.props.currentUser as IUserData).login : "",
			disabled: true,
			name: INPUT_TYPE.LOGIN,
		});

		const InputProfileName = new InputProfile({
			label: 'Имя',
			value: this.props.currentUser ? (this.props.currentUser as IUserData).first_name : "",
			disabled: true,
			name: INPUT_TYPE.FIRST_NAME,
		});

		const InputProfileSurname = new InputProfile({
			label: 'Фамилия',
			value: this.props.currentUser ? (this.props.currentUser as IUserData).second_name : "",
			disabled: true,
			name: INPUT_TYPE.SECOND_NAME,
		});
		const InputProfileDisplayName = new InputProfile({
			label: 'Имя в чате',
			value: this.props.currentUser ? (this.props.currentUser as IUserData).display_name : "",
			disabled: true,
			name: INPUT_TYPE.DISPLAY_NAME,
		});
		const InputProfilePhone = new InputProfile({
			label: 'Телефон',
			value:this.props.currentUser ? (this.props.currentUser as IUserData).phone : "",
			disabled: true,
			name: INPUT_TYPE.PHONE,
		});
		const ProfileAvatar = new Avatar({
			avatarUrl: avatarImg,
			name: 'avatar',
			onClick: onAvatarClick,
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
					{{{ ProfileAvatar }}}
				
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
				<div class="formProfile__modalChange-overlay"></div>
				<div class="formProfile__modalChange-modal">
					{{{ DownloadAvatar }}}
				</div>
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
