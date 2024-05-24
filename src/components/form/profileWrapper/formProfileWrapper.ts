import Block, { IComponentProps } from '../../../core/Block';
import { FormProfile } from '../../modules/profile/formProfile';
import { FormProfileEdit } from '../../modules/profile/formProfileEdit';

interface IFormProfileWrapper{
	onSubmit?: (e: Event) => void;
	formBodyProfile?: FormProfile | FormProfileEdit,
}
export default class FormProfileWrapper extends Block {
	constructor(props: IFormProfileWrapper) {
		super({...props,
			events: {
				submit: props.onSubmit,
			} })
	}
	componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps): boolean {
		if(oldProps === newProps) {
			return false;
		}
    	if(this.props !== newProps){
			this.props = newProps;
			this.render();
			return true;
	  }
	  return false;
	}
	render() {
		return (`
			<Form class="profile" onsubmit = "return false">
                {{{ formBodyProfile }}} 
            </Form>`
		);
	}
}
