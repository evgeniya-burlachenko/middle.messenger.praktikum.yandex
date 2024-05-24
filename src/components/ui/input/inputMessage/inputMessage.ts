import Block from "../../../../core/Block";

interface IInputMessage{
}

export default class InputMessage extends Block{
	constructor(props: IInputMessage){
		super(props);
	}

	render(){
		return(`
			<input 
			type="text" 
			id="{{inputId}}" 
			name="{{inputName}}" 
			value=""
			class="chatAreaInput__input--input" 
			placeholder="Сообщение">
	`);
	}
}
