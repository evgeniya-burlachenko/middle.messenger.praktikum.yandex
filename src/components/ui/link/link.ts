import Block from '../../../core/Block';

interface ILink {
	onClick?: (e: MouseEvent) => void,
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
			<div class = "link">
				<a href="URL">{{label}}></a>
			</div>
        `);
	}
}
export default Link;
