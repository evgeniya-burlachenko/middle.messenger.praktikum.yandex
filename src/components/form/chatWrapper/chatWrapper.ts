import Block, { IComponentProps } from '../../../core/Block';
import Router from '../../../core/Router';
import { IChatData, IStoreData, connect } from '../../../core/Store';
import AuthController from '../../../core/controllers/AuthController';
import ChatController from '../../../core/controllers/ChatController';

import { ChatArea } from '../../modules/chat/chatArea';
import { ChatList } from '../../modules/chat/chatList';

interface IFormChatWrapper{
	chatList: IChatData[]
}

class FormChatWrapper extends Block {
	constructor(props: IFormChatWrapper) {
		super({...props,
			chatList: props.chatList,
			events:{
				submit: props.onSubmit,
			  },
		});
	}
	init() {

		const ChatAreaField = new ChatArea({...this.props});
		const ChatListField = new ChatList({...this.props});

		this.children = {
			...this.children,
			ChatAreaField,
			ChatListField,
		};
	}
	componentDidMount(): void {
		const router = new Router();
		ChatController.getChats()
			.then(() => {
				AuthController.fetchUser()
					
			})
			.catch(() => {
				router.go('/');
			});
	}
	componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps ): boolean {
		if(oldProps === newProps){
			return false;
		}

		this.children.ChatListField.children.ItemList.setProps({
			chatList: newProps.chatList,
			currentChatId: newProps.currentChatId,
		});
		// this.children.ChatAreaField.children.ItemList.setProps({
		// 	chatList: newProps.chatList,
		// 	currentChatId: newProps.currentChatId
		// });
		return true;
	}
	render() {

		return (`      
		<div class="chat">
			{{{ChatListField}}}
			{{{ChatAreaField}}}
		</div>
		
		`);
	}
}
const mapStateToProps = (state: IStoreData) => {

	return {
		currentUser : state.currentUser,
		chatList: state.chatList,
	};
};

export default connect(mapStateToProps)(FormChatWrapper);
