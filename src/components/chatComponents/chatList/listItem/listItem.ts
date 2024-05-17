import Block from '../../../../core/Block';
import { IStoreData, connect, store } from '../../../../core/Store';
// import wsService from '../../../../core/Websockets';
import ChatController from '../../../../core/controllers/ChatController';
import { getParentDataSetParam, scrollToLastMessage } from '../../../../core/utils';
import { ws } from '../../../../main';


interface IListItem {
	onClick: () => {}
}
class ListItem extends Block{
	constructor(props:IListItem){
		super({
			...props,
			events: {
				click: (e: PointerEvent) => this.setCurrentChatId(e),
			  },
		});
	}

	async setCurrentChatId(e: PointerEvent) {
		const id = getParentDataSetParam(e.target as HTMLElement, 'listItem__content', 'id');

		if (id) {
		  store.set('currentChatId', id);
		  const chatUsers = await ChatController.getChatUsers(id);
		  // eslint-disable-next-line no-console
		  console.log(`Чат ${id}, пользователи: `, chatUsers);
		  ws.connect(); // Создаем подключение по Websocket
		} else {
		  scrollToLastMessage();
		}
	  }
	
	render(){
		const active = store.getState().currentChatId == this.props.id;


		// <img src="{{avatar}}" height="200px" width="200px" />
		return(`
			<div class="listItem {{#if ${active}}}listItem--active{{/if}} ">

				<div class="listItem__image">
				</div>
				<div class="listItem__content" data-id=${this.props.id}>
					<p class="listItem__title">{{title}}</p>
					<p class="listItem__text">{{text}}</p>
				</div>
				<div class="listItem__info">
					<p class="listItem__date">{{date}}</p>
				<div class="listItem__badge{{LImodifier}}">${this.props.unread_count}</div>
				</div>
			</div>
			
	`);
	}
}

const mapStateToProps = (state: IStoreData) => {

	return { currentUser : state.currentUser,
		currentChatId: state.currentChatId,
	};
};
export default  connect(mapStateToProps)(ListItem);
