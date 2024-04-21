import Block from '../../../../core/Block';

interface IFormProfileWrapper{

}
export default class FormProfileWrapper extends Block {
	constructor(props: IFormProfileWrapper) {
		super(props);
	}

	render() {
		return (`
			<div class="profile">
				<div class="profile__form">
                    {{{ formBodyProfile }}} 
                </div>
            </div>`
		);
	}
}
