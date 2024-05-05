
import Block, { IComponentProps } from '../../../../core/Block';
import { INPUT_TYPE } from '../input/inputElement';
import ErrorLineProfile from './errorLineProfile';
import InputProfile from './inputProfile';


interface IInputElementProfile{
	errorText?: string,
	onBlur?: (e: FocusEvent) => void,
	label?: string,
	value?: string,
	disabled?: boolean,
	type?: string,
	name: INPUT_TYPE
}
class InputElementProfile extends Block {
	constructor(props: IInputElementProfile) {
		super({
			...props,
			InputProfile: new InputProfile({
				...props,
				onBlur: props.onBlur || (() => {}),
				events: {
					blur: props.onBlur || (() => {}),
				},
			}),
			ErrorLineProfile: new ErrorLineProfile({
				error: props.errorText,
			}),
		});
	}

	componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps): boolean {
		if(oldProps === newProps) {
			return false;
		}
		if(this.props !== newProps){
			console.log("!!!1props1", this.props)
			this.props = newProps;
			this.render();
			console.log("!!!1props2", this.props)
			return true;
	  }
		// this.children.ErrorLineProfile.setProps(newProps);
		return true;
	}

	render() {
		return `
			<div class="inputProfile {{#if error}}inputProfile__error{{/if}}" >
				<label class="inputProfile__container">
					{{{ InputProfile }}}
					<div class="inputProfile__label">{{label}}</div>
				</label>
				{{{ ErrorLineProfile }}}
			</div>
    	`;
	}
}

export default InputElementProfile;
