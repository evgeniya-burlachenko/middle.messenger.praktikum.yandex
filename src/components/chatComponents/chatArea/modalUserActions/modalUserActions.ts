import Block from '../../../../core/Block';
import { AddUser } from '../../../../pages';
import { Button } from '../../../ui/button';
import { TYPE_BUTTON } from '../../../ui/button/button';

interface IModalUserActions {
	label?: string,
	isModalVisible?: boolean;
	onClose?: () => void;
}
export default class ModalUserActions extends Block {

	constructor(props: IModalUserActions) {
		super({...props,
			isAddUser: false,
			isRemoveUser: false,
		});
	}
	init() {
		const onAddUser = this.onAddUser.bind(this);
		const onRemoveUser = this.onRemoveUser.bind(this);

		const ButtonAddUser = new Button({
			label: 'Добавить пользователя',
			style: TYPE_BUTTON.LINK,
			onClick: (e: MouseEvent) => onAddUser(e),
		});
		const ButtonRemoveUser = new Button({
			label: 'Удалить пользователя',
			style: TYPE_BUTTON.LINK,
			onClick: (e: MouseEvent) => onRemoveUser(e),
		});

		const ModalAddUser = new AddUser({
			title: 'Добавить пользователя',
			label: 'Добавить',
		});

		const ModalRemoveUser = new AddUser({
			title: 'Удалить пользователя',
			label: 'Удалить',

		});

		this.children = {
			...this.children,
			ButtonAddUser,
			ButtonRemoveUser,
			ModalAddUser,
			ModalRemoveUser,
		};
	}

	onAddUser(e: MouseEvent){
		e.preventDefault();
		this.setProps({ isAddUser: true });
	}
	onRemoveUser(e: MouseEvent){
		e.preventDefault();
		this.setProps({ isRemoveUser: true });
	}

	onAvatarClick(){}

	render() {
		const { isAddUser, isRemoveUser } = this.props;

		return (
        	`<div class = "modalUserActions">
				<div class ='modalUserActions__field'>
					<div class = 'modalUserActions__field-btn'>	
						<img class="modalUserActions__field-btn--add"
						src="/assets/icons/add.svg"></img> 
						{{{ ButtonAddUser }}}
				
					</div>
					<div class = 'modalUserActions__field-btn'>	
					<img 
						class="modalUserActions__field-btn--delete"
						src="/assets/icons/add.svg"></img> 
						{{{ ButtonRemoveUser }}}
				
					</div>
				
				</div>
				
				<div class = 'modalUserActions__modalUser'>
					${isAddUser ? `
					<div class="modalUserActions__modalUser-overlay"></div>
					<div class="modalUserActions__modalUser-modal">
						{{{ ModalAddUser }}}
					</div>
					` : ''}
					${isRemoveUser ? `
					<div class="modalUserActions__modalUser-overlay"></div>
					<div class="modalUserActions__modalUser-modal">
						{{{ ModalRemoveUser }}}
					</div>
				` : ''}
				</div>
			</div>`
		);
	}
}
