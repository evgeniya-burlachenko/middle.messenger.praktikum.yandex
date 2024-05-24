import Block from "../../../../core/Block"
import {Image} from '../../../ui/image'

interface IListItem {

}
export default class ListItem extends Block{
	constructor(props:IListItem){
		super({
			...props,
			ImageList: new Image({
				...props,
				size: '47',
			}),
		})
	}

	render(){
		return(`
		<div class="listItem {{#if active}}listItem--active{{/if}}">
		<div class="listItem__image">
			{{{ImageList}}}
		</div>
		<div class="listItem__content">
			<p class="listItem__title">{{LItitle}}</p>
		<p class="listItem__text">{{LItext}}</p>
		</div>
		<div class="listItem__info">
			<p class="listItem__date">{{LIdate}}</p>
		<div class="listItem__badge{{LImodifier}}">{{LIbadge}}</div>
		</div>
		</div>
			
	`)
	}
}
