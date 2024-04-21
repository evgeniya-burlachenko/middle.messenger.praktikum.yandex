import Block from '../../core/Block';
import ErrorLine from './errorLine';

export enum TYPE_BUTTON{
	PRIMARY = 'primary',
	ERROR = 'error',
	LINK = 'link'
}
interface IButton {
	onClick?: (e: MouseEvent) => void;
	error?: string,
	errorText?: string,
	label?: string,
	type?: TYPE_BUTTON,
}
class Button extends Block {
	constructor(props: IButton) {
		super({
			...props,
			click: props.onClick,
			events: {
				click: props.onClick,
			},
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
			<div class = 'button-container {{#if error}}button__error{{/if}} '>
				<button class='button button__{{type}} {{#if text-underline }}  button__{{type}} && button__{{type}}__underline  {{/if}} {{#if data-message }} button__error {{/if}}
				'   >
					{{label}}
				</button>
				{{{ ErrorLine }}}
				<label class='button__text-error'>{{data-message}}</label>
			</div>
        `;
	}
}
export default Button;
