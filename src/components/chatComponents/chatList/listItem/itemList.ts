import Block, { IComponentProps } from '../../../../core/Block';
import { IStoreData, connect, store } from '../../../../core/Store';
import ListItem from './listItem';
import {listItemConfigs} from './listItemConfigs';

interface IItemList{
	chatList?:IItemList

}
class ItemList extends Block {
	constructor(props: IItemList) {
			const {chatList} = store.getState()
			console.log("!!!chats", props)
			const listItems = listItemConfigs.reduce<{[key: string]: ListItem}>((acc, itemConfig) => {
			const listItem = new ListItem(itemConfig);
			const listItemId = listItem._id;
			acc[listItemId] = listItem;
			return acc;
		}, {});

		super({
			...props,
			listItemComponentKeys: Object.keys(listItems),
			...listItems,
			chatList: props.chatList
		});
	}

	render() {
		const {chatList} = store.getState()
		console.log("!!!chatList", chatList)
		const listKeys = this.props.listItemComponentKeys as string[];
		const listItemHtml = listKeys.map(key => `{{{ ${key} }}}`).join('');
		return `
			<div>
				${listItemHtml}
			</div>
		`;
	}
}

const mapStateToProps = (state: IStoreData) => {
	return { 
		chatList: state.chatList
	}
}
export default  connect(mapStateToProps)(ItemList)
