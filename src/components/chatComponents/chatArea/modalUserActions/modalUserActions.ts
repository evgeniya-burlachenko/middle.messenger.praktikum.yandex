import Block from '../../../../core/Block';
import { AddUser } from '../../../../pages';
import { Button } from '../../../ui/button';
import { TYPE_BUTTON } from '../../../ui/button/button';
import add from '../../../../assets/icons/add.svg';
import UserController from '../../../../core/controllers/UserController';
import ChatController from '../../../../core/controllers/ChatController';
import { store } from '../../../../core/Store';

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
	async addUserToChat() {
		const userId = prompt('Введите login пользователя для добавления в текущий чат');
		try{
			if(userId){
				const newUser = await UserController.searchUser(userId) as unknown;
				let newUserId;
				if(Array.isArray(newUser)){
				 newUserId = newUser[0].id ;
				 if(newUserId){
						ChatController.addUserToChat((store.getState()).currentChatId,
							+ newUser[0].id)
							.then(() => {alert('Пользователь успешно добавлен!');})
							.catch(console.error);

					}
					else {

						alert('Поле не должно быть пустым!');
		  }
				}

			}

		}catch(error){
			alert(`Ошибка выполнения запроса! ${error}`);
		}
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
						src=${add}></img> 
						{{{ ButtonAddUser }}}
				
					</div>
					<div class = 'modalUserActions__field-btn'>	
					<img 
						class="modalUserActions__field-btn--delete"
						src=${add}></img> 
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
