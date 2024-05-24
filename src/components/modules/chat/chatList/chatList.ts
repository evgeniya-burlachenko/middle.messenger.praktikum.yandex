import { Button, InputSearch, Link } from '../../..';
import Block, { ICustomError } from '../../../../core/Block';
import Router from '../../../../core/Router';
import { IStoreData, connect, store } from '../../../../core/Store';
import ChatController from '../../../../core/controllers/ChatController';
import { ItemList } from '../../../chatComponents/chatList/listItem';


interface IChatList {
	onClick: () => void
}
class ChatList extends Block{
	constructor(props: IChatList){
		super({
			...props,
			events: {
				click: props.onClick,
			},
			ItemList: new ItemList({
				...props,
			}),

		});
	}


	init() {

		const createChat = this.createChat.bind(this);
		const onProfileClick = this.onProfileClick.bind(this);
		const LinkProfile= new Link({
			label: 'Профиль',
			onClick: (e: MouseEvent) => onProfileClick(e),
		});

		const InputSearchList = new InputSearch({});

		const BtnCreateChat = new Button({
			label: '+ Создать чат',
			onClick: () => createChat(),
		});

		this.children = {
			...this.children,
			LinkProfile,
			InputSearchList,
			BtnCreateChat,
		};
	}

	onProfileClick(e: MouseEvent) {
		e.preventDefault();
		new Router().go('/settings');

	}
	createChat() {
		const chatTitle = prompt('Введите название чата');
		if (chatTitle) {
			ChatController.createChat(chatTitle)
				.then(() => ChatController.getChats())
				.catch((error: ICustomError) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
		} else {
			alert('Название чата не должно быть пустым!');
		}
	}
	deleteChat() {
		const result = window.confirm('Вы действительно хотите удалить этот чат?');

		if (result) {
			ChatController.deleteChat(store.getState().currentChatId)
				.then(() => {
					store.set('messageList', []);
					ChatController.getChats()
						.then(() => {})
						.catch(console.error);
				})

				.catch((error: ICustomError) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
		}
	}

	render(){
		return(`
		<div class = 'chatList'>
			<div class="listHeader">
				{{{ LinkProfile }}}
				{{{ InputSearchList }}}
				<div class = 'block'>
				{{{ BtnCreateChat }}}
				</div>
				
			</div>
			{{{ItemList}}}	
		</div>
		`);
	}
}

const mapStateToProps = (state: IStoreData) => {
	return {
		chatList: state.chatList,
		currentChatId: state.currentChatId,
	};
};
export default  connect(mapStateToProps)(ChatList);
