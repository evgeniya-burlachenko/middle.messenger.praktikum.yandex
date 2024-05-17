import Block, { IComponentProps } from '../../../../core/Block';
import { IStoreData, connect, store } from '../../../../core/Store';
import { scrollToLastMessage } from '../../../../core/utils';
import { ws } from '../../../../main';
import { MessageArea, MessageList } from '../../../chatComponents/chatArea/contentArea';
import { HeaderMessage } from '../../../chatComponents/chatArea/headerArea';
import { MessageInput } from '../../../chatComponents/chatArea/messageInput';
import MessageInputWrapper from '../../../form/messageInputWrapper/messageInputWrapper';


interface IChatArea {

}
class ChatArea extends Block {
	constructor(props: IChatArea){
		super({...props,
			isModalVisible: false,
		});
	}

	init() {
		const Header= new HeaderMessage({});
		const Body = new MessageList({...this.props});
		const Footer = new MessageInput({...this.props});
		this.children = {
			...this.children,
			Header,
			Body,
			Footer,
		};
	}
	componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps ): boolean {
		if(oldProps === newProps){
		  return false;
		}
console.log("!!newProps", newProps)
		return true;

	  }
	render() {
		const input = store.getState().currentChatId ? `{{{ Footer }}}` : ``

		return (`
        <div class="chatArea">
			{{{ Header }}}
			{{{ Body }}}
			${input}
        </div>
    `);
	}
}
const mapStateToProps = (state: IStoreData) => {
	return {
		chatList: state.chatList,
		messageList: state.messageList,
		currentChatId: state.currentChatId,
	};
};
export default  connect(mapStateToProps)(ChatArea);
