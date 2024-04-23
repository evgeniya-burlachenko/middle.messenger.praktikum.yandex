import Block from '../../../core/Block';

interface IFormProfileWrapper{

}
export default class FormProfileWrapper extends Block {
	constructor(props: IFormProfileWrapper) {
		super({...props })
	}

	render() {
		return (`
			<form class="profile" onsubmit = "return false">
                {{{ formBodyProfile }}} 
            </form>`
		);
	}
}
