import Block from '../../../../core/Block';
import { AttachButton } from '../../../ui/attachButton';
import { AttachModal } from '../modalAttachment';

interface IAttach {

}

export default class Attach extends Block {
	constructor(props: IAttach) {
		super({
			...props,
			isVisibleModal: false,
		});
	}

	init() {
		const onClickHandler = this.onClickHandler.bind(this);

		const Modal =  new AttachModal({});
		const Attach = new AttachButton({
			onClick:  (e:MouseEvent) => onClickHandler(e),
		});
		this.children = {
			...this.children,
			Modal,
			Attach,
		};
	}

	onClickHandler(e: MouseEvent){
		e.preventDefault();
		if(this.props.isVisibleModal){
			this.setProps({ isVisibleModal: false });
		}else{
			this.setProps({ isVisibleModal: true });
		}
	}

	render() {
		const {isVisibleModal} = this.props;
		return (`
			<div >
			{{{Attach}}}
			${isVisibleModal ? `
				<div>{{{ Modal }}} </div>` : ''}
			</div>
		`);
	}
}
