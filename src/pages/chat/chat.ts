

import { FormChatWrapper } from '../../components/form/chatWrapper';
import Block from '../../core/Block';
import Router from '../../core/Router';
import AuthController from '../../core/controllers/AuthController';
import ChatController from '../../core/controllers/ChatController';

export interface IFormChatWrapper {

}
export default class Chat extends Block {
	constructor(props: IFormChatWrapper) {
		super({
			...props,
			FormChat: new FormChatWrapper({
				onCreateChat: () => this.createChat(),
				onDeleteChat: () => this.deleteChat(),
				onAddUser: () => this.addUserToChat(),
				onDeleteUser: () => this.removeUserFromChat(),
				getProfileInfo: () => this.getProfileInfo(),
			}),
		});
	}
	componentDidMount() {
		const router = new Router();
		ChatController.getChats().then(() => {
		  AuthController.fetchUser(); 
		}).catch(() => {
		  router.go('/');
		});
	  }
	render(): string {
		return (`
			<div>
				{{{ FormChat }}}
			</div>
			`);
	}
}
