import Block, { IComponentProps } from '../../../core/Block';
import { IStoreData, connect } from '../../../core/Store';
import ChatController from '../../../core/controllers/ChatController';

import { ChatArea } from '../../modules/chat/chatArea';
import { ChatList } from '../../modules/chat/chatList';


class FormChatWrapper extends Block {
	constructor(props) {
		super({...props,
		events: {
			onCreateChat: () => this.createChat(),
			onDeleteChat: () => this.deleteChat(),
			onAddUser: () => this.addUserToChat(),
			onDeleteUser: () => this.removeUserFromChat(),
			getProfileInfo: () => this.getProfileInfo(),
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

	return { currentUser : state.currentUser}
}

export default   connect(mapStateToProps)(FormChatWrapper)
