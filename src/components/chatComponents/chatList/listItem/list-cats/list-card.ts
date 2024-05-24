
import Block from '../../../../../core/Block';
import { IStoreData, connect } from '../../../../../core/Store';


interface IListCard{
	onClick: () => void
}

class ListCard extends Block {
	constructor(props: IListCard) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
		});
	}

	render(): string {
		return `
			 <div >
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
export default  connect(mapStateToProps)(ListCard);
