import Block from '../../../core/Block';
import { Button } from '../../button';
import { InputProfile } from '../../input/inputProfile';
import { navigate } from '../../../main';
import { Avatar } from '../..';
import { Download } from '../../../pages';
import { TYPE_BUTTON } from '../../button/button';

interface IFormProfile {

}
export default class FormProfile extends Block {
	constructor(props: IFormProfile){
		super({...props,
			isModalVisible: false,
		});
	}
	init() {
		const onAvatarClick = this.onAvatarClick.bind(this);

		const InputProfileEmail = new InputProfile({
			label: 'Почта',
			value: 'pochta@yandex.ru',
			disabled: true,
		});

		const InputProfileLogin = new InputProfile({
			label: 'Логин',
			value: 'ivanivanov',
			disabled: true,
		});

		const InputProfileName = new InputProfile({
			label: 'Имя',
			value: 'Иван',
			disabled: true,
		});

		const InputProfileSurname = new InputProfile({
			label: 'Фамилия',
			value: 'Иванов',
			disabled: true,
		});
		const InputProfileDisplayName = new InputProfile({
			label: 'Имя в чате',
			value: 'Иван',
			disabled: true,
		});
		const InputProfilePhone = new InputProfile({
			label: 'Телефон',
			value: '+7(909)9673030',
			disabled: true,
		});
		const ProfileAvatar = new Avatar({
			avatarUrl: '/assets/profile.svg',
			name: 'avatar',
			onClick: onAvatarClick,
			change: true,
		});
		const ButtonChangeData =  new Button({
			label: 'Изменить данные',
			type: TYPE_BUTTON.LINK,
			onClick: () => navigate('editProfileInformation')});

		const ButtonChangePassword =  new Button({
			label: 'Изменить пароль',
			type: TYPE_BUTTON.LINK,
			onClick: () => navigate('changePassword')});

		const DownloadAvatar = new Download({});

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

		};
	}

	onAvatarClick(){
		this.setProps({ isModalVisible: true });
	}

	render() {
		const { isModalVisible } = this.props;
		return (`
        <form class="formProfile">
			<div class = "formProfile__fields"> 
				{{{ ProfileAvatar }}}
				{{{ InputProfileEmail }}}
				{{{ InputProfileLogin }}}
				{{{ InputProfileName }}}
				{{{ InputProfileSurname }}}
				{{{ InputProfileDisplayName }}}
				{{{ InputProfilePhone }}}
			</div>
			
			<div class="formProfile__buttons">	
				{{{ ButtonChangeData }}}
				<br/>
				{{{ ButtonChangePassword }}}
			</div>

			<div class="formProfile__modalChange">   
				${isModalVisible ? `
				<div class="formProfile__modalChange-overlay"></div>
				<div class="formProfile__modalChange-modal">
					{{{ DownloadAvatar }}}
				</div>
				` : ''}
			</div>
         
        </form>
    `);
	}
}
