import Block from "../../../core/Block";

interface IAttachButton {
	onClick?: (e: MouseEvent) => void;
}
class AttachButton extends Block {
	constructor(props: IAttachButton) {
		super({
			...props,
			click: props.onClick,
			events: {
				click: props.onClick,
			},
		});
	}


	render(): string {
		return `
		<div class="attach" >
	 	</div>
        `;
	}
}
export default AttachButton;
