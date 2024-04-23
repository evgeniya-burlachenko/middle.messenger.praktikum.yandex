
import Block from '../../../../core/Block';
import ErrorLine from './errorLine';
import Input from './input';

export enum INPUT_TYPE{
	FIRST_NAME = 'first_name',
	SECOND_NAME = 'second_name',
	LOGIN = 'login',
	EMAIL = 'email',
	PASSWORD = 'password',
	PHONE = 'phone',
	MESSAGE  = 'message'

}
interface IInputElement{
	onBlur?: (e: FocusEvent) => void;
	errorText?: string,
	label?: string,
	name: INPUT_TYPE
}
class InputElement extends Block {
	constructor(props: IInputElement) {
		super({
			...props,
			Input: new Input({
				onBlur: props.onBlur || (() => {}),
				events: {
					blur: props.onBlur || (() => {}),
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
		<div class="input {{#if error}}input__error{{/if}}" >
			<label class="input__container">
				{{{ Input }}}
				<div class="input__label">{{label}}</div>
			</label>
			{{{ ErrorLine }}}
		</div>
	`;
	}
}

export default InputElement;
