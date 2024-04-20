import { FormProfile, FormProfileWrapper } from '../../components';
import Block from '../../core/Block';

export interface IProfile {
	FormProfile: FormProfileWrapper
}

export default class Profile extends Block {
	constructor(props: IProfile) {
		super({
			...props,
			FormProfile: new FormProfileWrapper({
				formBodyProfile: new FormProfile({}),
			}),
		});
	}
	render(): string {
		return `
			<div class="profile-container">
				<Form class="profile">
					{{{ FormProfile }}}
				</Form>
			</div>
        `;
	}
}
