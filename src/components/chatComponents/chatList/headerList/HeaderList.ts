import { Button, InputSearch, Link } from '../../..';
import Block, { ICustomError } from '../../../../core/Block';
import Router from '../../../../core/Router';
import ChatController from '../../../../core/controllers/ChatController';
interface IHeaderList{

}

export default class HeaderList extends Block{
	constructor(props: IHeaderList){
		super({
			...props,
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
				.catch((error: ICustomError) => alert(
					`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
		} else {
		  alert('Название чата не должно быть пустым!');
		}
	  }
	render(){
		return(`
			<div class="listHeader">
				{{{ LinkProfile }}}
				{{{ InputSearchList }}}
				{{{ BtnCreateChat }}}
			</div>
		`);
	}
}
