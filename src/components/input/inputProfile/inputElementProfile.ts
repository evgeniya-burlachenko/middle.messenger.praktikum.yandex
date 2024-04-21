
import Block from '../../../core/Block';
import ErrorLineProfile from './errorLineProfile';
import InputProfile from './inputProfile';


interface IInputElementProfile{
	errorText?: string,
	onBlur?: (e: FocusEvent) => void,
	label?: string,
	value?: string,
	disabled?: boolean,
	type?: string
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

	componentDidUpdate(oldProps: object, newProps: object): boolean {
		if(oldProps === newProps) {
			return false;
		}

		this.children.ErrorLineProfile.setProps(newProps);
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
