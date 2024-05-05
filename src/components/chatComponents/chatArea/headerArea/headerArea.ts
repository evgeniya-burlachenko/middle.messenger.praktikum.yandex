import Block from '../../../../core/Block';
import { Avatar } from '../../../ui/avatar';
import {KebabMenu} from '../../../ui/kebabMenu';
import { ModalUserActions } from '../modalUserActions';
import avatar from '../../../../assets/icons/profile.svg'
import { IStoreData, connect } from '../../../../core/Store';

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
		const HeaderMessageAvatar = new Avatar({
			avatarUrl: avatar,
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
	onKebabClick(e: MouseEvent){
		e.preventDefault()
		const { isModalVisible } = this.props;
		if(isModalVisible){
			this.setProps({ isModalVisible: false });
		}else {
			this.setProps({ isModalVisible: true });
		}
	}

	render() {
		const { isModalVisible} = this.props;
		console.log("!!header", this.props?.currentUser?.first_name)
		return (`
			<div class = 'headerArea'>
				<div class='header'>
					<div class = "header__avatar"> 
						{{{HeaderMessageAvatar}}}
					</div>
					<div class ='header__name'>${this.props?.currentUser?.first_name}</div>
					{{{ Kebab }}}
				</div>
				${isModalVisible ? `<div class = 'headerArea__modal'> {{{Actions}}} </div>` : ' ' }
			</div
   		`);
	}
}
const mapStateToProps = (state: IStoreData) => {
	// console.log("!!!2", state.currentUser)
	return { currentUser : state.currentUser}
}

export default  connect(mapStateToProps)(HeaderMessage)