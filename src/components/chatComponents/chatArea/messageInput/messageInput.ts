import Block from '../../../../core/Block';
import { ArrowButton } from '../../../ui/arrowButton';
import { INPUT_TYPE } from '../../../ui/input/input/inputElement';
import { InputMessage } from '../../../ui/input/inputMessage';
import Attach from '../attach/attach';
import arrowRight from '../../../../assets/icons/arrowRight.svg';
import { scrollToLastMessage } from '../../../../core/utils';
import { ws } from '../../../../main';

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
			events:{
				submit: (e:Event) => this.onSubmitHandler(e),
			  },
			AttachButton: new Attach({
				...props,
			}),
			ChatInput: new InputMessage({
				...props,
				name: INPUT_TYPE.MESSAGE,
			}),
			ArrowButton: new ArrowButton({
				...props,
				type: 'submit',
				src: arrowRight,
			}),
		});
	}

	onSubmitHandler(event: MouseEvent | Event){
		event.preventDefault();

		const component = this.children?.['ArrowButton'];
		if(component) {
			component.setProps({ error: false, errorText: '' });
			console.log('Данные формы:', this.formData);
		}
		const chatInput = document.querySelector('.chatAreaInput__input input') as HTMLInputElement;

		if (chatInput) {
			const inputValue = chatInput.value.trim();
			if(inputValue.length < 1){
				if(component){
					component.setProps({
						error: 'ошибка',
						errorText: 'Форма пустая. Напишите сообщение, пожалуйста перед отправкой',
					});
				}
			}else{
				ws.sendMessage(inputValue);
				scrollToLastMessage();
			}
      	if (chatInput) {
				(chatInput).value = ''; // Очистка текста ввода
     	 }
		  }

	}

	render(){
		return(`
			<form class="chatAreaInput chatAreaInput__submit" >
				{{{AttachButton}}}
				<div class="chatAreaInput__input">
					{{{ChatInput}}}
				</div>
				<div class="chatAreaInput__send">
					{{{ArrowButton}}}
				</div>	
			</form>
	`);
	}
}
