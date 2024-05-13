
import Block from "../../../../../core/Block";
import { IStoreData, connect, store } from "../../../../../core/Store";
import ChatController from "../../../../../core/controllers/ChatController";
import { getParentDataSetParam, scrollToLastMessage } from "../../../../../core/utils";


class ListCard extends Block {
    constructor(props) {
        super({
            ...props,
			events: {
                click: props.onClick
            }
        })
    }

    render(): string {
const {cards} = this.props;
const renderCards = cards.map(card => card.render()).join('')
console.log("!!!this.props", this)
        return `
        <div >
            {{#if showEmpty}}
                <h2>котиков нет (</h2>
            {{/if}}
            <ul class="renderCats">
                ${renderCards}
            </ul>
        </div>
        `
    }
}


const mapStateToProps = (state: IStoreData) => {
	return { currentUser : state.currentUser,
		currentChatId: state.currentChatId
	}
}
export default  connect(mapStateToProps)(ListCard)
