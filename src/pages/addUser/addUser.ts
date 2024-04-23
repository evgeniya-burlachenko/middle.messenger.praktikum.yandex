import { UserActions, ModalWrapper } from '../../components';
import Block from '../../core/Block';

export interface IAddUser{
	title?: string;
	label?: string;

}
export default class AddUser extends Block {
	constructor(props: IAddUser) {
		super({
			...props,
			UserActions: new ModalWrapper({
				title: props.title,
				modalBody: new UserActions({label: props.label}),

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
