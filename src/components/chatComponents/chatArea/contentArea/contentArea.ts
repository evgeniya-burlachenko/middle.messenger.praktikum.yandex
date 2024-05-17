import Block from '../../../../core/Block';
import { store } from '../../../../core/Store';
import formatTime from '../../../../core/utils';

interface IMessageArea {

}
class MessageArea extends Block {
	constructor(props: IMessageArea) {
		super(props);
	}

	render(): string {
		console.log("!!storearea", store.getState())
		const dateChat = formatTime(this.props.messageDate)
		const content = this.props.isMyMessage ? `
		<div class="mesageArea__incoming">
			<div class="mesageArea__incoming--text">{{messageText}} </div>
			<div class="mesageArea__incoming--date">${dateChat}</div>
		</div>` 
			: 
		`<div class="mesageArea__sent">
			<div class="mesageArea__sent--message">{{messageText}}!</div>
			<div class="mesageArea__sent--date">${dateChat}</div>
		</div>`

		return(`
        <form class="mesageArea">
    		${content}
		</form>
        `);
	}
}

export default MessageArea;
