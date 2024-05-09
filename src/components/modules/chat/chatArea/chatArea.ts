import Block from "../../../../core/Block";
import { IStoreData, connect } from "../../../../core/Store";
import { MessageArea } from "../../../chatComponents/chatArea/contentArea";
import { HeaderMessage } from "../../../chatComponents/chatArea/headerArea";
import { MessageInput } from "../../../chatComponents/chatArea/messageInput";


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
		const Body = new MessageArea({...this.props})
		const Footer = new MessageInput({})

		this.children = {
			...this.children,
			Header,
			Body,
			Footer,
		};
	}

	render() {
		return (`
        <div class="chatArea">
			{{{ Header }}}
			{{{ Body }}}
			{{{ Footer }}}
        </div>
    `);
	}
}
const mapStateToProps = (state: IStoreData) => {
	// console.log("!!!2", state.currentUser)
	return { currentUser : state.currentUser}
}

export default  connect(mapStateToProps)(ChatArea)
