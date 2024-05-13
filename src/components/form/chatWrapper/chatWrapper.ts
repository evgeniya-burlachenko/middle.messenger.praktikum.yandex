import Block from '../../../core/Block';
import { IStoreData, connect, store } from '../../../core/Store';
import ChatController from '../../../core/controllers/ChatController';

import { ChatArea } from '../../modules/chat/chatArea';
import { ChatList } from '../../modules/chat/chatList';


class FormChatWrapper extends Block {
	constructor(props) {
		super({...props,
			chatList: props.chatList,
		events: {
			onCreateChat: () => this.createChat(),
			onDeleteChat: () => this.deleteChat(),
			onAddUser: () => this.addUserToChat(),
			onDeleteUser: () => this.removeUserFromChat(),
			getProfileInfo: () => this.getProfileInfo(),
			setCurrentUser: () => this.setCurrentUser(),
		}})
	}
	init() {
	
		const ChatAreaField = new ChatArea({...this.props});
		const ChatListField = new ChatList({...this.props})

		this.children = {
			...this.children,
			ChatAreaField,
			ChatListField,
		};
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
		chatList: state.chatList
	}
}

export default connect(mapStateToProps)(FormChatWrapper)
