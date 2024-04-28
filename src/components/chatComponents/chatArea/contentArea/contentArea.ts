import Block from '../../../../core/Block';
import img from '../../../../assets/images/image.png'

interface IMessageArea {

}
class MessageArea extends Block {
	constructor(props: IMessageArea) {
		super(props);
	}

	render(): string {
		return(`
        <form class="mesageArea">
        <div class="mesageArea__date">19 июня</div>
        
        <div class="mesageArea__incoming">
            <div class="mesageArea__incoming--text">
                  {{{content}}}
                  </div>
            <div class="mesageArea__incoming--date">11:56</div>
        </div>
        <div class="mesageArea__image">
            <div class="mesageArea__message">
                <img src=${img} alt="">
            </div>
            <div class="mesageArea__incoming--date">11:56</div>
        </div>  
            
        <div class="mesageArea__sent">
            <div class="mesageArea__sent--message">Круто!</div>
            <div class="mesageArea__sent--date">12:00</div>
        </div>

	</form>
        `)
	}
}

export default MessageArea;
