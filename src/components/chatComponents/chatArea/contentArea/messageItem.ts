

import {  MessageArea } from '../../..';
import Block, { IComponentProps } from '../../../../core/Block';
import {  IMessageProps, connect } from '../../../../core/Store';
import { ListMessage } from './listMessage';


interface IItemList {
	onClick: () => void,
	messageList: IMessageProps[]
}

class MessageList extends Block {
	messageList: IMessageProps[];
	constructor(props: IItemList) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
		});
		this.messageList = props.messageList;
	}


	init(): void {
		const ListCat = new ListMessage({
			cards: this.mapStateToProps(this.messageList ) || [],
			...this.props,
		});
		this.children = {
			ListCat,
		};
	}

	mapStateToProps(catCard : IMessageProps[]) {
		return catCard?.map(({
			isMyMessage,
			messageText,
			messageDate,
		}) =>
			new MessageArea({
				isMyMessage,
				messageText,
				messageDate,

			}));
	}

	componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps): boolean {
		if(oldProps === newProps){
			return false;
		  }

		this.children.ListCat.setProps({
			cards: this.mapStateToProps((newProps.messageList as IMessageProps[])) || [],
			currentChatId: newProps.currentChatId,
		});
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
