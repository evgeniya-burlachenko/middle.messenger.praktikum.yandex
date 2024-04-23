

import { FormChatWrapper } from '../../components/modules/chatWrapper';
import Block from '../../core/Block';

export interface IFormChatWrapper {

}
export default class Chat extends Block {
	constructor(props: IFormChatWrapper) {
		super({
			...props,
			FormChat: new FormChatWrapper({
				// formBodyClasses: "chatWrapper secondWrapper",
				// formBody: new ChatAreaField({}), new ChatAreaField({})
			}),
		});
	}
	render(): string {
		return (`
			<div>
				{{{ FormChat }}}
			</div>
			`);
	}
}
