

import { FormChatWrapper } from '../../components/form/chatWrapper';
import Block, { IComponentProps } from '../../core/Block';
import Router from '../../core/Router';
import { IStoreData, connect, store } from '../../core/Store';
import AuthController from '../../core/controllers/AuthController';
import ChatController from '../../core/controllers/ChatController';

export interface IFormChatWrapper {

}
class Chat extends Block {
	constructor(props: IFormChatWrapper) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
			FormChat: new FormChatWrapper({
				...props

			}),
		});
	}
	componentDidMount() {
		const router = new Router();
		ChatController.getChats()
			.then(() => {
		  		AuthController.fetchUser(); 
				})
			.catch(() => {router.go('/');
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
const mapStateToProps = (state: IStoreData) => {
	return { chatList : state.chatList}
}
export default  connect(mapStateToProps)(Chat)
