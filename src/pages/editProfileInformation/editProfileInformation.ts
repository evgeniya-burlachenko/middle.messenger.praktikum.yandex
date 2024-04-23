import { FormProfileWrapper } from '../../components';
import { FormProfileEdit } from '../../components/modules/profile/formProfileEdit';
import Block from '../../core/Block';

export interface IEditProfile {
	FormProfile: FormProfileWrapper
}
export default class EditProfile extends Block {
	constructor(props: IEditProfile) {
		super({
			...props,
			FormProfile: new FormProfileWrapper({
				formBodyProfile: new FormProfileEdit({}),
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
