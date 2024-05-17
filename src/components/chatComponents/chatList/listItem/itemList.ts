

import { Button } from '../../..';
import Block, { IComponentProps } from '../../../../core/Block';

import {  connect, store  } from '../../../../core/Store';
import ChatController from '../../../../core/controllers/ChatController';
import UserController from '../../../../core/controllers/UserController';


import { ListCard } from './list-cats';
import ListItem from './listItem';

interface IItemList {
    chatList?: IItemList;
	onClick: () => void
}

class ItemList extends Block {

	constructor(props: IItemList) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
		});
	}


	init(): void {

		const deleteChat = this.deleteChat.bind(this);
		const addUserToChat = this.addUserToChat.bind(this);
		const removeUserFromChat = this.removeUserFromChat.bind(this);

		const ListCat = new ListCard({
			cards: this.mapStateToProps(this.chatList, null) || [],
			...this.props,

		});
		const BtnDeleteChat = new Button({
			label: '- Удалить чат',
			onClick: () => deleteChat(),
		});
		const BtnAddUser= new Button({
			label: '+ Добавить пользователя в чат',
			onClick: () => addUserToChat(),
		});
		const BtnRemoveUser= new Button({
			label: '- Удалить пользователя из чата',
			onClick: () => removeUserFromChat(),
		});

		this.children = {
			ListCat,
			BtnDeleteChat,
			BtnAddUser,
			BtnRemoveUser,
		};
	}
	deleteChat() {
	// eslint-disable-next-line no-alert
		const result = window.confirm('Вы действительно хотите удалить этот чат?');

		if (result) {
	  ChatController.deleteChat(store.getState().currentChatId as string)
				.then(() => {
		  store.set('messageList', []);
		  ChatController.getChats()
		//   .then(() => {})
		//   .catch(() => {});
				})

				.catch((error) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
		}
	}
	async addUserToChat() {
		// eslint-disable-next-line no-alert
		const userId = prompt('Введите login пользователя для добавления в текущий чат');
		try{
			if(userId){
				const newUser = await UserController.searchUser(userId);
				const newUserId = newUser[0].id;
				if(newUserId){
					ChatController.addUserToChat(store.getState().currentChatId,
						+newUser[0].id)
						.then(() => {})
						.catch(() => {});
					alert('Пользователь успешно добавлен!');
				}
				else {
					// eslint-disable-next-line no-alert
					alert('Поле не должно быть пустым!');
		  }
			}


		}catch(error){
			alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`);
		}
	}

	removeUserFromChat() {
		// eslint-disable-next-line no-alert
		const userId = prompt('Введите ID пользователя для удаления из текущего чата');
		if (userId) {
			ChatController.removeUserFromChat(store.getState().currentChatId, +userId)
			// eslint-disable-next-line no-alert
				.then(() => alert('Пользователь успешно удалён!'))
			// eslint-disable-next-line no-alert
				.catch((error) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
		} else {
			// eslint-disable-next-line no-alert
			alert('Поле не должно быть пустым!');
		}
	}
	mapStateToProps(catCard, activeId) {

		return catCard?.map(({title, avatar, id, unread_count}) =>
			new ListItem({
				title,
				avatar: avatar,
				id,
				activeId,
				unread_count,
			}));
	}

	componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps): boolean {
		if(oldProps === newProps){
			return false;
		  }
		this.children.ListCat.setProps({
			cards: this.mapStateToProps(newProps.chatList, null) || [],
			currentChatId: newProps.currentChatId,
		});
		console.log("!!this.children.ListCat2", this.children.ListCat)
		return true;
	}

	render() {
		const btnDelete =  store.getState().currentChatId;
		const deleteBlock = btnDelete ? '<div> 	<hr/> {{{BtnDeleteChat}}} {{{BtnAddUser}}} {{{BtnRemoveUser}}}</div>' : '';
		return `
            <div>
			${deleteBlock}
			{{{ ListCat }}}
            </div>
        `;
	}
}


export default connect(({chatList, currentChatId}) => ({chatList, currentChatId: currentChatId}))(ItemList);
