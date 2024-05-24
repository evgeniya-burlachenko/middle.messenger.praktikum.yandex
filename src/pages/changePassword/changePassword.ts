import { BackButton, FormChangePassword,  FormProfileWrapper } from '../../components';
import Block from '../../core/Block';
import Router from '../../core/Router';
import { ChangePasswordData } from '../../core/api/AuthAPI';
import UserController from '../../core/controllers/UserController';
import backArrow from '../../assets/icons/arrow-left.svg';

export interface IChangePassword {

}
export  interface IFormDataProps{
	repeat?: string,
	oldPassword?: string,
	newPassword?: string
}
export default class ChangePassword extends Block {

	constructor(props: IChangePassword) {
		super({
			...props,
			FormProfile: new FormProfileWrapper({
				formBodyProfile: new FormChangePassword({FormDataProps: {
					repeat: '',
					password: '',
					newPassword: '',
				}}),
				onSubmit: (e: Event)=> this.onSubmitHandler(e),
			}),
			ButtonBackArrow: new BackButton({
				src: backArrow,
				onClick: () =>new Router().go('/settings'),
			}),
		});
	}
	onSubmitHandler(event: MouseEvent | Event){
		event.preventDefault();
		const formData = this.children.FormProfile.children.
			formBodyProfile.props.FormDataProps  as  IFormDataProps;
		const btnError = this.children.FormProfile.children.
			formBodyProfile.children.ButtonSaveData;
		if(!formData || !formData.repeat || !formData.oldPassword || !formData.newPassword ){
			btnError.setProps({ error: 'ошибка', errorText:  'Форма содержит ошибки, submit' });
			return;
		}
		UserController.changePassword(formData as ChangePasswordData)
			.then(() => console.log('Пароль успешно обновлен!'))
			.catch((error) =>  console.log(`Ошибка выполнения запроса авторизации! ${error}`));
		btnError.setProps({error: '', errorText: ''});
		console.log('Данные формы(submit):', formData);
	}
	render(): string {
		return (`
			<div class="profile-container">
			<div class = 'formChangePassword__btn-back'>
			{{{ButtonBackArrow}}}
			</div>	
				{{{ FormProfile }}}
			</div>
			`);
	}
}
