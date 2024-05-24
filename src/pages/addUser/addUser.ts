import { UserActions, ModalWrapper } from '../../components';
import Block from '../../core/Block';

export interface IAddUser{
	title?: string;
	label?: string;

}
export  interface IFormDataProps{
	login?: string,
	password?: string
}
export default class AddUser extends Block {
	constructor(props: IAddUser) {
		super({
			...props,
			UserActions: new ModalWrapper({
				title: props.title,
				modalBody: new UserActions({label: props.label,
					FormDataProps: {login: ""} }),
				onSubmit: (e) => {
					e.preventDefault();
					const formData = this.children.UserActions.children.modalBody.props.FormDataProps  as  IFormDataProps
					console.log('Данные формы(submit):', formData)
				},

			}),
		});
	}

	render() {
		return(`
            <div>
                {{{ UserActions}}}
            </div>
        `);
	}
}
