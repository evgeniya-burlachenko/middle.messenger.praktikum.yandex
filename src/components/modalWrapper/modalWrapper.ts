import Block from '../../core/Block';

interface IModalWrapper{

}
export default class ModalWrapper extends Block {
	constructor(props: IModalWrapper) {
		super(props);
	}

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
