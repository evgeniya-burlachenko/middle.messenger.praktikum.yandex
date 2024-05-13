

import { Button } from '../../..';
import Block, { IComponentProps } from '../../../../core/Block';

import {  connect, store  } from '../../../../core/Store';
import ChatController from '../../../../core/controllers/ChatController';
import { getParentDataSetParam, scrollToLastMessage } from '../../../../core/utils';


import { ListCard } from './list-cats';
import ListItem from './listItem';

interface IItemList {
    chatList?: IItemList;
}

class ItemList extends Block {

    constructor(props: any) {
        super({
            ...props,
			events: {
				click: props.onClick
			},
        });
    }


init(): void {

	const deleteChat = this.deleteChat.bind(this)
	const addUserToChat = this.addUserToChat.bind(this)
	const current = store.getState().currentChatId 
	const ListCat = new ListCard({
		cards: this.mapStateToProps(this.chatList, null, current) || [],
		...this.props,
		
	})
	const BtnDeleteChat = new Button({
		label: "- Удалить чат",
		onClick: () => deleteChat()
	})
	const BtnAddUser= new Button({
		label: "+ Добавить пользователя в чат",
		onClick: () => addUserToChat()
	})

	this.children = {
		ListCat,
		BtnDeleteChat,
		BtnAddUser
	}
}
deleteChat() {
	// eslint-disable-next-line no-alert
	const result = window.confirm('Вы действительно хотите удалить этот чат?');

	if (result) {
	  ChatController.deleteChat(store.getState().currentChatId)
		.then(() => {
		  store.set('messageList', []);
		  ChatController.getChats();
		})

		.catch((error) => alert(`Ошибка выполнения запроса! ${error ? error.reason : ''}`));
	}
  }
  addUserToChat() {
    // eslint-disable-next-line no-alert
    const userId = prompt('Введите ID пользователя для добавления в текущий чат');
    if (userId) {
      ChatController.addUserToChat(store.getState().currentChatId, +userId)
        // eslint-disable-next-line no-alert
        .then(() => alert('Пользователь успешно добавлен!'))
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
			}))
    }

    componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps): boolean {
		if(oldProps === newProps){
			return false;
		  }
			this.children.ListCat.setProps({
                cards: this.mapStateToProps(newProps.chatList, null) || [],
				currentChatId: newProps.currentChatId
            })
		
        return true;
    }

    render() {
		const btnDelete =  store.getState().currentChatId
		const deleteBlock = btnDelete ? `<div> {{{BtnDeleteChat}}} {{{BtnAddUser}}}</div>` : ""
        return `
            <div>
		${deleteBlock}
			{{{ ListCat }}}
            </div>
        `;
    }
}



export default connect(({chatList, currentChatId}) => ({chatList, currentChatId: currentChatId}))(ItemList)