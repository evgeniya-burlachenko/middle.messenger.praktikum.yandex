import Block from '../../../../core/Block';
import { Button } from '../../../ui/button';

import { navigate } from '../../../../main';
import { Avatar } from '../../..';
import { Download } from '../../../../pages';
import { TYPE_BUTTON } from '../../../ui/button/button';
import { InputProfile } from '../../../ui/input/inputProfile';
import { INPUT_TYPE } from '../../../ui/input/input/inputElement';
import avatar from '../../../../assets/icons/profile.svg'
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
			name: INPUT_TYPE.EMAIL,
		});

		const InputProfileLogin = new InputProfile({
			label: 'Логин',
			value: 'ivanivanov',
			disabled: true,
			name: INPUT_TYPE.LOGIN,
		});

		const InputProfileName = new InputProfile({
			label: 'Имя',
			value: 'Иван',
			disabled: true,
			name: INPUT_TYPE.FIRST_NAME,
		});

		const InputProfileSurname = new InputProfile({
			label: 'Фамилия',
			value: 'Иванов',
			disabled: true,
			name: INPUT_TYPE.SECOND_NAME,
		});
		const InputProfileDisplayName = new InputProfile({
			label: 'Имя в чате',
			value: 'Иван',
			disabled: true,
			name: INPUT_TYPE.DISPLAY_NAME,
		});
		const InputProfilePhone = new InputProfile({
			label: 'Телефон',
			value: '+7(909)9673030',
			disabled: true,
			name: INPUT_TYPE.PHONE,
		});
		const ProfileAvatar = new Avatar({
			avatarUrl: avatar,
			name: 'avatar',
			onClick: onAvatarClick,
			change: true,
		});
		const ButtonChangeData =  new Button({
			label: 'Изменить данные',
			style: TYPE_BUTTON.LINK,
			onClick: () => navigate('editProfileInformation'),
		});

		const ButtonChangePassword =  new Button({
			label: 'Изменить пароль',
			style: TYPE_BUTTON.LINK,
			onClick: () => navigate('changePassword'),
		});
		const ButtonExit =  new Button({
			label: 'Выход',
			style: TYPE_BUTTON.ATTENTION,
			onClick: () => navigate('nav')});


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
			ButtonExit,

		};
	}

	onAvatarClick(){
		this.setProps({ isModalVisible: true });
	}

	render() {
		const { isModalVisible } = this.props;
		return (`
        <div class="formProfile">
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
				{{{ ButtonChangePassword }}}
				{{{ButtonExit}}}
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
