import Block from '../../../core/Block';


interface IBackButton{
	onClick?: (e: MouseEvent) => void,
	src?: string,
	errorText?: string,
	error?: string,
	onSubmit?: (e: MouseEvent) => void;
	type?: string,
}
export default class BackButton extends Block{
	constructor(props:IBackButton){
		super({
			...props,
			events: {
				click: props.onClick,
				submit: props.onSubmit,
			},
		});
	}


	render(){
		return(`
			<button class="arrowButton">
				<img src="{{src}}" 
				alt="{{alt}}" 
				class="arrowButton__image">
			</button>
		`);
	}
}
