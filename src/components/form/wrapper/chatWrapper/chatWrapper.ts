import Block from '../../../../core/Block';

interface IChatWrapper{

}
export default class ChatWrapper extends Block {
	constructor(props: IChatWrapper) {
		super(props);
	}
	// ChatWrapper:
	// ChatListWrapper:
	// -chatList
	// -search
	// ChatAreaWrapper
	// -chatArea
	// -message

	render() {
		return (`      
				<Form class ="modalWrapper">
				{{#if title}}
					<p class="form-title">{{title}}</p>
				{{/if}}
                    <div class="modalWrapper__content">
                        {{{ modalBody }}} 
                    </div>
                </Form>`
		);
	}
}
