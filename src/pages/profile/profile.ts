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
				formBodyProfile: new FormProfile({FormDataProps: {login: "", password: ""}}),
			}),
		});
	}
	render(): string {
		return `
			<div>
				{{{ FormProfile }}}
			</div>
        `;
	}
}
