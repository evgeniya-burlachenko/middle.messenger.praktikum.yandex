import { UserActions, ModalWrapper } from '../../components';
import Block from '../../core/Block';

export interface IAddUser{

}
export default class AddUser extends Block {
	constructor(props: IAddUser) {
		super({
			...props,
			UserActions: new ModalWrapper({
				title: 'Добавить пользователя',
				modalBody: new UserActions({label: 'Добавить'}),

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
