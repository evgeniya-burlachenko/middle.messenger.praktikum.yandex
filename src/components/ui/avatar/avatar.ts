import Block from '../../../core/Block';


interface IAvatarProps {
	onClick?: (e: MouseEvent) => void,
	avatarUrl?: string,
	name?: string,
	change: boolean,
}
class Avatar extends Block {
	constructor(props: IAvatarProps) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
		});
	}

	render(): string {
		return `
		<div class="avatar-container">
			<div class="avatar">
				<img src={{#if avatarUrl}} "{{avatarUrl}}" {{else}} "/assets/icons/profile.svg"{{/if}} alt="avatar" class="avatar__image" name ="{{name}}">
				${this.props.change ?`<div class="avatar__overlay">
				<span class="avatar__overlay-text"></span>
			</div>` : ''}
	
			</div>
	
		</div>
    
        `;
	}
}

export default Avatar;
