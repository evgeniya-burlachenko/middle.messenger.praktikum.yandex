

import { Button, MessageArea } from '../../..';
import Block, { IComponentProps } from '../../../../core/Block';

import {  connect, store  } from '../../../../core/Store';
import ChatController from '../../../../core/controllers/ChatController';
import UserController from '../../../../core/controllers/UserController';


import { ListCard } from './list-cats';
import ListItem from './listItem';
import { ListMessage } from './listMessage';
import listMessage from './listMessage/listMessage';

interface IItemList {
    // chatList?: IItemList;
	onClick: () => void
}

class MessageList extends Block {

	constructor(props: IItemList) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
		});
	}


	init(): void {
		const ListCat = new ListMessage({
			cards: this.mapStateToProps(this.messageList, null) || [],
			...this.props,
		});
		this.children = {
			ListCat,
		};
	}

	mapStateToProps(catCard, activeId) {

		return catCard?.map(({isMyMessage,
			messageText,
			messageDate
			}) =>
			new MessageArea({
				isMyMessage,
				messageText,
				messageDate
		
			}));
	}

	componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps): boolean {
		if(oldProps === newProps){
			return false;
		  }
		  console.log("!!componentDidUpdate", newProps)
		this.children.ListCat.setProps({
			cards: this.mapStateToProps(newProps.messageList, null) || [],
			currentChatId: newProps.currentChatId,
		});
console.log("!!this.children.ListCat", this.children.ListCat)
		return true;
	}

	render() {

		return `
            <div class = 'messages-container'>
	
			{{{ ListCat }}}
            </div>
        `;
	}
}


export default connect(({messageList, currentChatId}) => ({messageList, currentChatId: currentChatId}))(MessageList);
