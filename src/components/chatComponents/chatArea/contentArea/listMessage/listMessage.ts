
import Block from '../../../../../core/Block';
import { IStoreData, connect } from '../../../../../core/Store';


interface IListMessage{
	onClick: () => void
}

class ListMessage extends Block {
	constructor(props: IListMessage) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
		});
	}

	render(): string {
		return `
			 <div class= 'cards'>
				<ul class="renderCats">
				{{{cards}}}
				</ul>
			</div>
		`;
	}
}


const mapStateToProps = (state: IStoreData) => {
	return { currentUser : state.currentUser,
		currentChatId: state.currentChatId,
	};
};
export default  connect(mapStateToProps)(ListMessage);
