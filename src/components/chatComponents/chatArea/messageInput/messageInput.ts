import Block from "../../../../core/Block"
import { ArrowButton } from "../../../ui/arrowButton"
import { INPUT_TYPE } from "../../../ui/input/input/inputElement"
import { InputMessage } from "../../../ui/input/inputMessage"
import Attach from "../attach/attach"
import arrowRight from '../../../../assets/icons/arrowRight.svg'


interface IFormData{
	[key: string]: string
}

interface IMessageInput{

}

export default class MessageInput extends Block{
	private formData: IFormData = {};
	constructor(props: IMessageInput){
		super({
			...props,
			AttachButton: new Attach({
				...props,
			}),
			ChatInput: new InputMessage({
				...props,
				name: INPUT_TYPE.MESSAGE,
				onBlur:  (e: FocusEvent) => this.onBlurHandler(e, 'message'),
			}),
			ArrowButton: new ArrowButton({
				...props,
				type: 'submit',
				src: arrowRight,
				onClick: (e: MouseEvent)=> this.onSubmitHandler(e),
				// onSubmit: (e: MouseEvent)=> this.onSubmitHandler(e),
			}),
		})

		this.onSubmitHandler = this.onSubmitHandler.bind(this)
	}

	onBlurHandler(e: FocusEvent, field: string){
		const target =  e.target as HTMLInputElement;
		const inputValue = target.value.trim();
		this.formData[field] = inputValue;
	}
	onSubmitHandler(event: MouseEvent | Event){
		event.preventDefault();

		const hasEmptyKeys = Object.keys(this.formData).length === 0;
		const hasEmptyFields = Object.values(this.formData).some(value => value.trim() === "");

		if( hasEmptyKeys || hasEmptyFields){
			const component =  this.children?.['ArrowButton'];

			if(component){
				component.setProps({
					error: 'ошибка',
					errorText: 'Форма пустая. Напишите сообщение, пожалуйста перед отправкой',
				});
			}
			return;
		}
		const component = this.children?.['ArrowButton'];
		if(component) {
			component.setProps({ error: false, errorText: '' });
			console.log('Данные формы:', this.formData);

			//  PATCH
		}
	}

	render(){
		return(`
			<div class="chatAreaInput chatAreaInput__submit" >
				{{{AttachButton}}}
				<div class="chatAreaInput__input">
					{{{ChatInput}}}
				</div>
				<div class="chatAreaInput__send">
					{{{ArrowButton}}}
				</div>	
			</div>
	`)
	}
}
