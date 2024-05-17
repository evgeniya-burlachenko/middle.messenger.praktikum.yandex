

import { Button } from '../../..';
import Block, { IComponentProps } from '../../../../core/Block';
import {  IChatData, IStoreData, connect, store  } from '../../../../core/Store';
import ChatController from '../../../../core/controllers/ChatController';
import UserController from '../../../../core/controllers/UserController';
import { ListCard } from './list-cats';
import ListItem from './listItem';

interface IItemList {
	onClick: () => void,
	chatList: IChatData[]
}

class ItemList extends Block {
	chatList: IChatData[];

	constructor(props: IItemList) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
		});
		this.chatList = props.chatList;
	}


	init(): void {

		const deleteChat = this.deleteChat.bind(this);
		const addUserToChat = this.addUserToChat.bind(this);
		const removeUserFromChat = this.removeUserFromChat.bind(this);

		const ListCat = new ListCard({
			cards: this.mapStateToProps(this.chatList ) || [],
			...this.props,

		});
		const BtnDeleteChat = new Button({
			label: '- Удалить чат',
			onClick: () => void deleteChat(),
		});
		const BtnAddUser= new Button({
			label: '+ Добавить пользователя в чат',
			onClick: () => void addUserToChat(),
		});
		const BtnRemoveUser= new Button({
			label: '- Удалить пользователя из чата',
			onClick: () => void removeUserFromChat(),
		});

		this.children = {
			ListCat,
			BtnDeleteChat,
			BtnAddUser,
			BtnRemoveUser,
		};
	}
	deleteChat() {

		const result = window.confirm('Вы действительно хотите удалить этот чат?');

		if (result) {
			const currentChatId = (store.getState() as IStoreData).currentChatId;
			if (currentChatId){
				ChatController.deleteChat(currentChatId)
					.then(() => {
		  store.set('messageList', []);
		  ChatController.getChats().then(() => {}).catch(() => {});
					})

					.catch((error) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
			}
		}

	}
	async addUserToChat() {
		const userId = prompt('Введите login пользователя для добавления в текущий чат');
		try{
			if(userId){
				const newUser = await UserController.searchUser(userId) as unknown;
				let newUserId;
				if(Array.isArray(newUser)){
				 newUserId = newUser[0].id ;
				 if(newUserId){
						ChatController.addUserToChat((store.getState()).currentChatId,
							+ newUser[0].id)
							.then(() => {alert('Пользователь успешно добавлен!');})
							.catch(console.error);

					}
					else {

						alert('Поле не должно быть пустым!');
		  }
				}

			}

		}catch(error){
			alert(`Ошибка выполнения запроса! ${error}`);
		}
	}

	async removeUserFromChat() {
		const userId = prompt('Введите логин пользователя для удаления из текущего чата');
		try{
			if (userId) {
				const newUser = await UserController.searchUser(userId) as unknown;
				console.log('!!newUser', newUser);
				let newUserId;
				if(Array.isArray(newUser)){
					newUserId = newUser[0].id;
				}
				if(newUserId){
					ChatController.removeUserFromChat((store.getState()).currentChatId, + userId)
						.then(() => alert('Пользователь успешно удалён!'));
				}
				else{
					alert('Поле не должно быть пустым!');
				}
			}
		}catch(error){
			alert(`Ошибка выполнения запроса! ${error}`);
		}
	}
	mapStateToProps(catCard: IChatData[]) {

		return catCard?.map(({title, avatar, id, unread_count}) =>
			new ListItem({
				title,
				avatar: avatar,
				id,
				unread_count,
			}));
	}

	componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps): boolean {
		if(oldProps === newProps){
			return false;
		  }
		this.children.ListCat.setProps({
			cards: this.mapStateToProps((newProps.chatList as IChatData[])) || [],
			currentChatId: newProps.currentChatId,
		});
		return true;
	}

	render() {
		const btnDelete =  store.getState().currentChatId;
		const deleteBlock = btnDelete ? '<div class = "block" > 	<hr/> <div class="block__element">{{{BtnDeleteChat}}}</div>  <div class="block__element">{{{BtnAddUser}}} </div> <div class="block__element">{{{BtnRemoveUser}}}</div></div>' : '';
		return `
            <div >
			${deleteBlock}
			{{{ ListCat }}}
            </div>
        `;
	}
}


export default connect(({chatList, currentChatId}) => ({chatList, currentChatId: currentChatId}))(ItemList);
