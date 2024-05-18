import Block, { IComponentProps } from '../../../../core/Block';
import { Avatar } from '../../../ui/avatar';
import {KebabMenu} from '../../../ui/kebabMenu';
import { ModalUserActions } from '../modalUserActions';
import avatar from '../../../../assets/icons/profile.svg';
import { IChatData, IStoreData, IUserData, connect, store } from '../../../../core/Store';

interface IHeaderMessage {

}
class HeaderMessage extends Block {
	constructor(props: IHeaderMessage){
		super({...props,
			isModalVisible: false,
		});
	}
	init() {
		const onKebabClick = this.onKebabClick.bind(this);
		const avatarUrl = this.props.currentUser && (this.props.currentUser as IChatData).avatar !== null ? `https://ya-praktikum.tech/api/v2/resources${(this.props.currentUser as IUserData).avatar}`: avatar;

		const HeaderMessageAvatar = new Avatar({
			avatarUrl: avatarUrl,
			name: 'avatar',
			change: false,
		});
		const Kebab = new KebabMenu({
			onClick: (e: MouseEvent) => onKebabClick(e),
		});
		const Actions = new ModalUserActions({});

		this.children = {
			...this.children,
			HeaderMessageAvatar,
			Kebab,
			Actions,
		};
	}
	componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps ): boolean {
		if(oldProps === newProps){
		  return false;
		}

		if((newProps.currentUser as IUserData).avatar && (newProps.currentUser as IUserData).avatar !== null) {
			this.children.HeaderMessageAvatar.setProps({avatarUrl: `https://ya-praktikum.tech/api/v2/resources${(newProps.currentUser as IUserData).avatar}` });
		}


		return true;

	  }
	onKebabClick(e: MouseEvent){
		e.preventDefault();
		const { isModalVisible } = this.props;
		if(isModalVisible){
			this.setProps({ isModalVisible: false });
		}else {
			this.setProps({ isModalVisible: true });
		}
	}

	render() {
		const { isModalVisible} = this.props;
		const currentChatId = (store.getState() as IStoreData).currentChatId ;
		const listChat = (store.getState() as IStoreData).chatList;

		let currentChat;
		currentChatId && listChat ?
			currentChat = listChat.find((item: IChatData) => item.id.toString()  == currentChatId) : '';
		const title = currentChat ? currentChat.title : 'выберете чат';

		return (`
			<div class = 'headerArea'>
				<div class='header'>
					<div class = "header__avatar"> 
					{{{HeaderMessageAvatar}}}
					</div>
					<div class ='header__name'>${title}</div>
			
				</div>
				${isModalVisible ? '<div class = \'headerArea__modal\'> {{{Actions}}} </div>' : ' ' }
			</div
   		`);
	}
}
// {{{ Kebab }}}
const mapStateToProps = (state: IStoreData) => {
	return { currentUser : state.currentUser};
};

export default  connect(mapStateToProps)(HeaderMessage);
