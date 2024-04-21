
import  InputFile  from './input';
import Block from '../../../core/Block';
import ErrorLine from './errorLineFile';


interface IInputElement{
	// onBlur?: (e: FocusEvent) => void;
	errorText?: string,
	label?: string,
	title?: string,
	type?: string
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
