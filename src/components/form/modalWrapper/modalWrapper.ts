import Block from '../../../core/Block';
import { UserActions } from '../../chatComponents/userActions';
import { FormDownload } from '../../formDownloading';

interface IModalWrapper{
	onSubmit?: (e: Event) => void;
	title?: string;
	modalBody?: UserActions | FormDownload;
}
export default class ModalWrapper extends Block {
	constructor(props: IModalWrapper) {
		super({...props,
			events: {
				submit: props.onSubmit,
				change: props.onChange,
				click: props.onClick
			}});
	}

	render() {
		return (`      
				<Form class ="modalWrapper" >
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
