import Block from '../../../../core/Block';
import { IChatData, IStoreData, connect, store } from '../../../../core/Store';
import ChatController from '../../../../core/controllers/ChatController';
import { getParentDataSetParam, scrollToLastMessage } from '../../../../core/utils';
import { ws } from '../../../../main';
import avatar from '../../../../assets/icons/profile.svg';


interface IListItem {
	onClick: () => void
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
		const active =( store.getState() as IStoreData).currentChatId == this.props.id;
		const count = this.props.unread_count ?
			'<div class="listItem__badge{{LImodifier}}">{{unread_count}}</div>' :
			'';
		const avatarUrl = this.props.avatar ? `https://ya-praktikum.tech/api/v2/resources${(this.props.avatar as IChatData).avatar}`: avatar;
		return(`
			<div class="listItem {{#if ${active}}}listItem--active{{/if}} ">
			<div class ="list__avatar">
			<img class="listItem__image-avatar" src="${avatarUrl}" height="48px" width="48px" />
			</div>
				<div class="listItem__content" data-id={{id}}>
					<p class="listItem__title">{{title}}</p>
					<p class="listItem__text">{{text}}</p>
				</div>
				<div class="listItem__info">
					<p class="listItem__date">{{date}}</p>
				${count}
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
