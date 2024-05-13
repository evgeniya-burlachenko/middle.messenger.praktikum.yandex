import Block from "../../../../core/Block"
import {Image} from '../../../ui/image'
import avatar from '../../../../assets/icons/profile.svg'

import { getParentDataSetParam, scrollToLastMessage } from "../../../../core/utils";
import { IStoreData, connect, store } from "../../../../core/Store";
import ChatController from "../../../../core/controllers/ChatController";


interface IListItem {

}
 class ListItem extends Block{
	constructor(props:IListItem){
		super({
			...props,
		

		})
	}

	render(){
		const activeChatBorder = store.getState().currentChatId === this.props.id ? 'style="background: #92bdff"' : '';

		const active = store.getState().currentChatId == this.props.id 

		
// <img src="{{avatar}}" height="200px" width="200px" />
		return(`
			<div class="listItem {{#if ${active}}}listItem--active{{/if}} ">

				<div class="listItem__image">
				</div>
				<div class="listItem__content" data-id=${this.props.id}>
					<p class="listItem__title">${this.props.title}</p>
					<p class="listItem__text">{{text}}</p>
				</div>
				<div class="listItem__info">
					<p class="listItem__date">{{date}}</p>
				<div class="listItem__badge{{LImodifier}}">${this.props.unread_count}</div>
				</div>
			</div>
			
	`)
	}
}

const mapStateToProps = (state: IStoreData) => {

	return { currentUser : state.currentUser,
		currentChatId: state.currentChatId
	}
}
export default  connect(mapStateToProps)(ListItem)