
import  InputFile  from './input';

import ErrorLine from './errorLineFile';
import Block from '../../../../core/Block';


interface IInputElement{
	// onBlur?: (e: FocusEvent) => void;
	errorText?: string,
	label?: string,
	title?: string,
	type?: string,
	onChange: () => void
}
class inputElementFile extends Block {
	constructor(props: IInputElement) {
		super({
			...props,
			Input: new InputFile({
				...props,
			}),
			ErrorLine: new ErrorLine({
				error: props.errorText,
			}),
			events: {
				change: props.onChange
			}
		});
	}

	componentDidUpdate(oldProps: object, newProps: object): boolean {
		if(oldProps === newProps) {
			return false;
		}
		this.children.ErrorLine.setProps(newProps);
		return true;
	}

	render(): string {
		return `
		<div class="input {{#if error}}input__error{{/if}}" >
			{{{ Input }}}
			{{{ ErrorLine }}}
		</div>
	`;
	}
}

export default inputElementFile;
