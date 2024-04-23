import Block from '../../../../core/Block';
import { Avatar } from '../../../ui/avatar';
import {KebabMenu} from '../../../ui/kebabMenu';
import { ModalUserActions } from '../modalUserActions';

interface IHeaderMessage {

}
export default class HeaderMessage extends Block {
	constructor(props: IHeaderMessage){
		super({...props,
			isModalVisible: false,
		});
	}
	init() {
		const onKebabClick = this.onKebabClick.bind(this);
		const HeaderMessageAvatar = new Avatar({
			avatarUrl: '/assets/icons/profile.svg',
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
		return (`
			<div class = 'headerArea'>
				<div class='header'>
					<div class = "header__avatar"> 
						{{{HeaderMessageAvatar}}}
					</div>
					<div class ='header__name'>Имя</div>
					{{{ Kebab }}}
				</div>
				${isModalVisible ? `<div class = 'headerArea__modal'> {{{Actions}}} </div>` : ' ' }
			</div
   		`);
	}
}
