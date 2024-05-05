import Block from '../../../core/Block';
import { IStoreData, connect } from '../../../core/Store';

import { ChatArea } from '../../modules/chat/chatArea';
import { ChatList } from '../../modules/chat/chatList';


class FormChatWrapper extends Block {
	constructor(props) {
		super({...props})
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
		console.log("!!!chat", this.props.currentUser)
		return (`      
		<div class="chat">
			{{{ChatListField}}}
			{{{ChatAreaField}}}
		</div>
		
		`);
	}
}
const mapStateToProps = (state: IStoreData) => {
	// console.log("!!!", state.currentUser)
	return { currentUser : state.currentUser}
}

export default   connect(mapStateToProps)(FormChatWrapper)
