import { Button, InputSearch, Link } from "../../..";
import Block, { IComponentProps } from "../../../../core/Block"
import Router from "../../../../core/Router";
import { IStoreData, connect } from "../../../../core/Store";
import ChatController from "../../../../core/controllers/ChatController";
import HeaderList from "../../../chatComponents/chatList/headerList/HeaderList"
import { ItemList } from "../../../chatComponents/chatList/listItem"


interface IChatList {

}
 class ChatList extends Block{
	constructor(props: IChatList){
		super({
			...props,
			ListHeader: new HeaderList({
				...props,
			}),
			ItemList: new ItemList({
				...props,
			}),

		})
	}


	init() {
		const createChat = this.createChat.bind(this)
		const onProfileClick = this.onProfileClick.bind(this)
		const LinkProfile= new Link({
			label: "Профиль",
			onClick: (e: MouseEvent) => onProfileClick(e),
		})

		const InputSearchList = new InputSearch({})

		const BtnCreateChat = new Button({
			label: "+ Создать чат",
			onClick: () => createChat()
		})

		this.children = {
			...this.children,
			LinkProfile,
			InputSearchList,
			BtnCreateChat
		};
	}
	componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps ): boolean {
		if(oldProps === newProps){
		  return false;
		}

		this.children.ItemList.setProps({chatList: this.props.chatList})
		return true;
	
	  }
	  onProfileClick(e: MouseEvent) {
		e.preventDefault()
		new Router().go('/settings')

	}
	  createChat() {
		const chatTitle = prompt('Введите название чата');
		if (chatTitle) {
		  ChatController.createChat(chatTitle)
			.then(() => ChatController.getChats())
			.catch((error) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
		} else {
		  alert('Название чата не должно быть пустым!');
		}
	  }
	render(){
		console.log("!!chatList", this.props)
		return(`
		<div class = 'chatList'>
		<div class="listHeader">
				{{{ LinkProfile }}}
				{{{ InputSearchList }}}
				{{{ BtnCreateChat }}}
			</div>
	
			{{{ItemList}}}	
		</div>
		`)
	}
}

const mapStateToProps = (state: IStoreData) => {
	return { 
		chatList: state.chatList
	}
}
export default  connect(mapStateToProps)(ChatList)