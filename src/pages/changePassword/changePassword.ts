import { FormChangePassword,  FormProfileWrapper } from '../../components';
import Block from '../../core/Block';

export interface IChangePassword {

}
export  interface IFormDataProps{
	repeat?: string,
	password?: string
}
export default class ChangePassword extends Block {

	constructor(props: IChangePassword) {
		super({
			...props,
			FormProfile: new FormProfileWrapper({
				formBodyProfile: new FormChangePassword({FormDataProps: {repeat: "", password: ""}}),
				onSubmit: (e) => {
					e.preventDefault();
					const formData = this.children.FormProfile.children.formBodyProfile.props.FormDataProps  as  IFormDataProps
					const btnError = this.children.FormProfile.children.formBodyProfile.children.ButtonSaveData
					if(!formData || !formData.repeat || !formData.password){
						btnError.setProps({ error: 'ошибка', errorText:  'Форма содержит ошибки, submit' });
						return
					}
					btnError.setProps({error: '', errorText: ''})
					console.log('Данные формы(submit):', formData)
				},
			}),
		});
	}

	render(): string {
		return (`
			<div class="profile-container">
				{{{ FormProfile }}}
			</div>
			`);
	}
}
