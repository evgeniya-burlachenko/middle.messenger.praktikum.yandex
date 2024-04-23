import Block from '../../../core/Block';
import ErrorLine from './errorLine';

export enum TYPE_BUTTON{
	PRIMARY = 'primary',
	ATTENTION = 'attention',
	LINK = 'link',
	SUBMIT = 'submit'
}
interface IButton {
	onClick?: (e: MouseEvent) => void;
	error?: string,
	errorText?: string,
	label?: string,
	style?: TYPE_BUTTON,
	type?: string,
	onSubmit?: (e: MouseEvent) => void;
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
			<div class = 'button-container {{#if error}}button-error{{/if}} '>
				<button class='button button__{{style}} {{#if text-underline }}  button__{{type}} && button__{{style}}__underline  {{/if}} {{#if data-message }} button__error {{/if}}
				'   >
					{{label}}
				</button>
			 {{{ ErrorLine }}}
				<label class='{{#if error}} button__text-error{{/if}} '>{{data-message}}</label>
			</div>
        `;
	}
}
export default Button;
