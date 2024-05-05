import { InputSearch, Link } from "../../..";
import Block from "../../../../core/Block"
import Router from "../../../../core/Router";
interface IHeaderList{

}

export default class HeaderList extends Block{
	constructor(props: IHeaderList){
		super({
			...props,
		})
	}
	init() {
		const onProfileClick = this.onProfileClick.bind(this)
		const LinkProfile= new Link({
			label: "Профиль",
			onClick: (e: MouseEvent) => onProfileClick(e),
		})

		const InputSearchList = new InputSearch({})

		this.children = {
			...this.children,
			LinkProfile,
			InputSearchList,
		};


	}
	onProfileClick(e: MouseEvent) {
		e.preventDefault()
		new Router().go('/settings')
		// navigate('profile')
	}

	render(){
		return(`
			<div class="listHeader">
				{{{ LinkProfile }}}
				{{{ InputSearchList }}}
			</div>
		`)
	}
}
