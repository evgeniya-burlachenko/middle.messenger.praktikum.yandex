import Block from "../../../core/Block"
import { HeaderList } from "./headerList"
import { ItemList} from "./listItem"

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
		console.log("!!!props", this.props)
		return(`
		<div class = 'chatList'>
			{{{ListHeader}}}
			{{{ItemList}}}	
		</div>
		`)
	}
}
