import Block from "../../../../core/Block"
import HeaderList from "../../../chatComponents/chatList/headerList/HeaderList"
import { ItemList } from "../../../chatComponents/chatList/listItem"


interface IChatList {

}
export default class ChatList extends Block{
	constructor(props: IChatList){
		super({
			...props,
			ListHeader: new HeaderList({
				...props,
			}),
			ItemList: new ItemList({
				...props,
			}),

		})
	}

	render(){
		return(`
		<div class = 'chatList'>
			{{{ListHeader}}}
			{{{ItemList}}}	
		</div>
		`)
	}
}
