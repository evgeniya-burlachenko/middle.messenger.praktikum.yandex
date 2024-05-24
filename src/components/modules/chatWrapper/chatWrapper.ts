import Block from '../../../core/Block';
import ChatArea from '../../chatComponents/chatArea/chatArea';
import { ChatList } from '../../chatComponents/chatList';

export default class FormChatWrapper extends Block {
	init() {
		const ChatAreaField = new ChatArea({});
		const ChatListField = new ChatList({})
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
