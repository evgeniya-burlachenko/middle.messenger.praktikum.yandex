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
		const message = `Привет! Смотри, 
		тут всплыл интересный кусок лунной космической истории — НАСА в
		 какой-то момент попросила Хассельблад адаптировать модель SWC 
		 для полетов на Луну. Сейчас мы все знаем что астронавты летали 
		 с моделью 500 EL — и к слову говоря, все тушки этих камер все еще 
		 находятся на поверхности Луны, так как астронавты с собой забрали 
		 только кассеты с пленкой.<br><br>

		 Хассельблад в итоге адаптировал SWC 
		 для космоса, но что-то пошло не так и на
		  ракету они так никогда и не попали. Всего их было 
		  произведено 25 штук, одну из них недавно продали 
		  на аукционе за 45000 евро.`
		// console.log("!!!this.pro", this.props.currentUser)
		const Header= new HeaderMessage({});
		const Body = new MessageArea({content: message})
		const Footer = new MessageInput({})

		this.children = {
			...this.children,
			Header,
			Body,
			Footer,
		};
	}

	render() {
		// console.log("!!!chatArea.", this.props?.currentUser?.first_name)
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
