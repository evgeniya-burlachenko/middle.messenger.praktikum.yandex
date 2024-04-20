import Block from '../../core/Block';

interface ITitle {

}
class Title extends Block {
	constructor(props: ITitle) {
		super(props);
	}

	render(): string {
		return (`
			<h3 class="form__title {{#if textError}} form__title-error {{/if}}" name={{name}}>{{title}}</h3>
        `);
	}
}

export default Title;
