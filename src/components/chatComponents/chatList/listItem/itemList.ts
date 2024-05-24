import Block from '../../../../core/Block';
import ListItem from './listItem';
import {listItemConfigs} from './listItemConfigs';

interface IItemList{

}
export default class ItemList extends Block {
	constructor(props: IItemList) {
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
		});
	}

	render() {
		const listKeys = this.props.listItemComponentKeys as string[];
		const listItemHtml = listKeys.map(key => `{{{ ${key} }}}`).join('');
		return `
			<div>
				${listItemHtml}
			</div>
		`;
	}
}
