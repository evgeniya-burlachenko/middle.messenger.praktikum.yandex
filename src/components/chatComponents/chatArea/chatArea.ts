import Block from '../../../core/Block';
import { HeaderMessage } from './headerArea';
import { MessageArea } from './contentArea';
import { MessageInput } from './messageInput';

interface IChatArea {

}
export default class ChatArea extends Block {
	constructor(props: IChatArea){
		super({...props,
			isModalVisible: false,
		});
	}
	init() {
		const message = `Привет! Смотри, 
		тут всплыл интересный кусок лунной космической истории — НАСА в
		 какой-то момент попросила Хассельблад адаптировать модель SWC 
		 для полетов на Луну. Сейчас мы все знаем что астронавты летали 
		 с моделью 500 EL — и к слову говоря, все тушки этих камер все еще 
		 находятся на поверхности Луны, так как астронавты с собой забрали 
		 только кассеты с пленкой.<br><br>

		 Хассельблад в итоге адаптировал SWC 
		 для космоса, но что-то пошло не так и на
		  ракету они так никогда и не попали. Всего их было 
		  произведено 25 штук, одну из них недавно продали 
		  на аукционе за 45000 евро.`

		const Header= new HeaderMessage({});
		const Body = new MessageArea({content: message})
		const Footer = new MessageInput({})

		this.children = {
			...this.children,
			Header,
			Body,
			Footer,
		};
	}

	render() {
		return (`
        <div class="chatArea">
			{{{ Header }}}
			{{{ Body }}}
			{{{ Footer }}}
        </div>
    `);
	}
}
