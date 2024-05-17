import Block from '../../../core/Block';


interface IMessageInputWrapper{
	onSubmit?: (e: MouseEvent) => void;
	formBody?: any

}
export default class MessageInputWrapper extends Block {
	constructor(props: IMessageInputWrapper) {
		super({...props,
			events: {
				submit: props.onSubmit,
		
			}});
	}

	render() {
		return (`      
				<Form class ="messageWrapper" >
					{{{ formBody }}} 
                </Form>`
		);
	}
}
