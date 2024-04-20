import Block from '../../core/Block';

interface ILink {
	onClick?: () => void,
	label?: string
}
class Link extends Block {
	constructor(props: ILink) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
		});
	}

	render(): string {
		return (`
			<div class = "button-container">
				<a href="URL">{{label}}</a>
			</div>
        `);
	}
}
export default Link;
