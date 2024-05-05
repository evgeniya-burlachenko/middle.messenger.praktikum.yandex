

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
		console.log("!!this", this.props)
		return (`
			<div>
				{{{ FormChat }}}
			</div>
			`);
	}
}
