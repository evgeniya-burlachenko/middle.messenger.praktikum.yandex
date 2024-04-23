import { FormChangePassword,  FormProfileWrapper } from '../../components';
import Block from '../../core/Block';

export interface IChangePassword {
	FormProfile: FormProfileWrapper
}
export default class ChangePassword extends Block {

	constructor(props: IChangePassword) {
		super({
			...props,
			FormData:{},
			FormProfile: new FormProfileWrapper({
				formBodyProfile: new FormChangePassword({FormData}),
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
