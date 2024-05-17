import { BackButton, FormProfileWrapper } from '../../components';
import { FormProfileEdit } from '../../components/modules/profile/formProfileEdit';
import Block from '../../core/Block';
import Router from '../../core/Router';
import { IStoreData, connect } from '../../core/Store';
import { IProfileData } from '../../core/api/UserApi';
import AuthController from '../../core/controllers/AuthController';
import UserController from '../../core/controllers/UserController';
import backArrow from '../../assets/icons/arrow-left.svg';
export interface IEditProfile {

}

export  interface IFormDataProps{
	login?: string,
	password?: string
}
class EditProfile extends Block {
	constructor(props: IEditProfile) {
		super({
			...props,
			FormProfile: new FormProfileWrapper({
				formBodyProfile: new FormProfileEdit({FormDataProps: {}}),
				onSubmit: (e: Event)=> this.onSubmitHandler(e),
			}),
			ButtonBackArrow: new BackButton({
				src: backArrow,
				onClick: () =>new Router().go('/settings'),
			}),
		});
	}
	componentDidMount() {
		AuthController.fetchUser().catch(() => new Router().go('/'));
	}
	onSubmitHandler(event: MouseEvent | Event){
		event.preventDefault();
		console.log('!!onSubmitHandler', event);
		const formData = this.children.FormProfile.children.
			formBodyProfile.props.FormDataProps  as  IFormDataProps;
		if(!formData) return;
		console.log('!!formData', formData);
		UserController.updateProfile(formData as IProfileData)
			.then(() => console.log('Профиль успешно обновлен!'))
			.catch((error) =>
				console.log(`Ошибка выполнения запроса обновления профиля! ${error}`));
		console.log('Измененные данные формы(submit):', formData);

	}
	render(): string {
		return (`
			<div>
			<div class = 'formProfileEdit__btn-back'>
			{{{ButtonBackArrow}}}
			</div>
				{{{ FormProfile }}}
			</div>
		`);
	}
}
const mapStateToProps = (state: IStoreData) => {
	return { currentUser : state.currentUser};
};
const withUser = connect(mapStateToProps);

export default  withUser(EditProfile);
