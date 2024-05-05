import { BackButton, FormProfileWrapper } from '../../components';
import { FormProfileEdit } from '../../components/modules/profile/formProfileEdit';
import Block from '../../core/Block';
import Router from '../../core/Router';
import { IStoreData, connect } from '../../core/Store';
import { IProfileData } from '../../core/api/UserApi';
import AuthController from '../../core/controllers/AuthController';
import UserController from '../../core/controllers/UserController';

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
				formBodyProfile: new FormProfileEdit({FormDataProps: {login: "", password: ""}}),
				onSubmit: (e: Event)=> this.onSubmitHandler(e),
			}),
			ButtonBackArrow: new BackButton({
				onClick: () =>new Router().go('/messenger'),
			}),
		});
	}
	componentDidMount() {

		AuthController.fetchUser().catch(() => new Router().go('/'));
	  }
	async onSubmitHandler(event: MouseEvent | Event){
		event.preventDefault();
		const formData = this.children.FormProfile.children.formBodyProfile.props.FormDataProps  as  IFormDataProps;
		if(!formData) return
		UserController.updateProfile(formData as IProfileData)
        .then(() => console.log('Профиль успешно обновлен!'))
        .catch((error) => console.log(`Ошибка выполнения запроса обновления профиля! ${error ? error.reason : ''}`));
    
		console.log('Измененные данные формы(submit):', formData)
	}
	render(): string {
		console.log("!!edit", this.props)
		return (`
			<div>
				{{{ FormProfile }}}
			</div>
        `);
	}
}
const mapStateToProps = (state: IStoreData) => {
	console.log("!!!", state.currentUser)
	return { currentUser : state.currentUser}
}
const withUser = connect(mapStateToProps);

export default  withUser(EditProfile)