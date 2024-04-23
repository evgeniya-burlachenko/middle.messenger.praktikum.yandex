import Block from "../../../core/Block"
import ErrorLine from "./errorLine"

interface IArrowButton{
	onClick?: (e: MouseEvent) => void,
	src?: string,
	errorText?: string,
	error?: string,
	onSubmit?: (e: MouseEvent) => void;
	type?: string,
}
export default class ArrowButton extends Block{
	constructor(props:IArrowButton){
		super({
			...props,
			click: props.onClick,
			events: {
				click: props.onClick,
				submit: props.onSubmit,
			},
			ErrorLine: new ErrorLine({
				error: props.errorText,
			}),
		})
	}
	componentDidUpdate(oldProps: object, newProps: object): boolean {
		if(oldProps === newProps) {
			return false;
		}
		this.children.ErrorLine.setProps(newProps);
		return true;
	}
	render(){
		console.log("!!!this", this.props)
		return(`
		<div class = 'button-container {{#if error}}button-error{{/if}} '>
			<button 
				class="arrowButton"
				type="submit" 
				>
			<img src="{{src}}" 
				alt="{{alt}}" 
				class="arrowButton__image">
			</button>
			<div class="errorBlock"> 
				{{{ ErrorLine }}}
			<label class='{{#if error}} button__text-error{{/if}} '>{{data-message}}</label>
			</div>
		</div>
		`)
	}
}
