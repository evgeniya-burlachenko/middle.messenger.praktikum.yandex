
import Block from '../../../../core/Block';
import { INPUT_TYPE } from '../input/inputElement';

import ErrorLine from './errorLine';
import InputMessage from './inputMessage';

interface IInputElement{
	onBlur?: (e: FocusEvent) => void;
	errorText?: string,
	label?: string,
	name: INPUT_TYPE,
	value?: string,
	onSubmit?: () => void
}
class InputElementMessage extends Block {
	constructor(props: IInputElement) {
		super({
			...props,
			Input: new InputMessage({
				...props,
				onBlur: props.onBlur || (() => {}),
				events: {
					blur: props.onBlur || (() => {}),
					submit: props.onSubmit,

				},
			}),
			ErrorLine: new ErrorLine({
				error: props.errorText,
			}),
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
		<div class=" chatAreaInput__input {{#if error}}input__error{{/if}}" >
				{{{ Input }}}
			{{{ ErrorLine }}}
		</div>
	`;
	}
}

export default InputElementMessage;
