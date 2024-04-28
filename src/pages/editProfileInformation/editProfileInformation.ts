import { BackButton, FormProfileWrapper } from '../../components';
import { FormProfileEdit } from '../../components/modules/profile/formProfileEdit';
import Block from '../../core/Block';
import { navigate } from '../../main';

export interface IEditProfile {

}

export  interface IFormDataProps{
	login?: string,
	password?: string
}
export default class EditProfile extends Block {
	constructor(props: IEditProfile) {
		super({
			...props,
			FormProfile: new FormProfileWrapper({
				formBodyProfile: new FormProfileEdit({FormDataProps: {login: "", password: ""}}),
				onSubmit: (e) => {
					e.preventDefault();
					const formData = this.children.FormProfile.children.formBodyProfile.props.FormDataProps  as  IFormDataProps;
					if(!formData) return
					console.log('Измененные данные формы(submit):', formData)
				},
			}),
			ButtonBackArrow: new BackButton({
				onClick: () => navigate('/chat'),
			}),
		});
	}
	render(): string {
		return (`
			<div>
				{{{ FormProfile }}}
			</div>
        `);
	}
}
