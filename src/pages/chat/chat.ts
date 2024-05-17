import { FormChatWrapper } from '../../components/form/chatWrapper';
import Block from '../../core/Block';
import Router from '../../core/Router';
import { IStoreData, connect, store } from '../../core/Store';
import AuthController from '../../core/controllers/AuthController';
import ChatController from '../../core/controllers/ChatController';
import { getParentDataSetParam, scrollToLastMessage } from '../../core/utils';

export interface IFormChatWrapper {

}
class Chat extends Block {
	constructor(props: IFormChatWrapper) {
		super({
			...props,
			events: {
				click: (e: PointerEvent) => this.setCurrentChatId(e),
		
			
			},
			FormChat: new FormChatWrapper({
				...props,
			}),
		});
	}
	componentDidMount() {
		const router = new Router();
		ChatController.getChats()
			.then(() => {
				AuthController.fetchUser()
					.then(()=>{})
					.catch(() => {});
			})
			.catch(() => {router.go('/');
			});
	}

	async setCurrentChatId(e: PointerEvent) {
		const id = getParentDataSetParam(e.target as HTMLElement, 'listItem__content', 'id');

		if (id) {
			store.set('currentChatId', id);
			this.children.FormChat.children.ChatListField.children.
				ItemList.setProps({
					currentChatId: store.getState().currentChatId
				});
			this.children.FormChat.children.ChatAreaField.setProps({
				currentChatId: store.getState().currentChatId
			});
			this.children.FormChat.children.ChatAreaField.children.
				Header.setProps({
					currentChatId: store.getState().currentChatId
				});
			this.children.FormChat.children.ChatAreaField.children.
				Footer.setProps({
					currentChatId: store.getState().currentChatId
				});
			this.children.FormChat.children.ChatAreaField.children.
				Body.setProps({
					currentChatId: store.getState().currentChatId
				});
			const chatUsers = await ChatController.getChatUsers(id);
			console.log(`Чат ${id}, пользователи: `, chatUsers);
		} else {
			scrollToLastMessage();
		}
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
	return { chatList : state.chatList};
};
export default  connect(mapStateToProps)(Chat);
