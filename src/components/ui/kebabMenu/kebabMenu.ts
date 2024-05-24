import Block from '../../../core/Block';


interface IKebabMenu {
	onClick?: (e: MouseEvent) => void;
}
class KebabMenu extends Block {
	constructor(props: IKebabMenu) {
		super({
			...props,
			events: {
				click: props.onClick,
			},

		});
	}

	render(): string {
		return (`
			<div class="menu">
				<div class="menu__item"></div>
				<div class="menu__item"></div>
				<div class="menu__item"></div>
			</div>
        `);
	}
}

export default KebabMenu;
