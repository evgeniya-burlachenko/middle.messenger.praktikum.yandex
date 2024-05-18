import { Button, FormDownload, ModalWrapper } from '../../components';
import { TYPE_BUTTON } from '../../components/ui/button/button';
import Block, { IComponentProps } from '../../core/Block';
import UserController from '../../core/controllers/UserController';

export interface IDownload{
	FormDownLoad?: ModalWrapper,
}
export default class Download extends Block {
	constructor(props: IDownload) {
		super({
			...props,
			ButtonDownload: new Button({
				label: 'Закрыть Х',
				style: TYPE_BUTTON.PRIMARY,
				onClick: (e: MouseEvent)=> this.handleFileUpload(e),
			}),
			FormDownLoad: new ModalWrapper({
				modalBody: new FormDownload({
					isVisibleFile: false,
				}),
				onChange: (e: Event) => {
					const target= e.target as HTMLInputElement;
					const file: File= target.files![0];
					const formData = new FormData();
					const fileName = file.name;
					formData.append('avatar', file as string | Blob);
					UserController.changeAvatar(formData)
						.then(() => {})
						.catch(() => {});
					this.children.FormDownLoad.children.modalBody.setProps({fileName});
				},
			}),

		});
	}
	componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps ): boolean {
		if(oldProps === newProps){
			return false;
		}
		return true;
	}
	private handleFileUpload(event: MouseEvent){
		event.preventDefault();
		this.setProps({isVisibleFile: true});
	}
	render() {
		const content = this.props.isVisibleFile ? '' : `       
		<div class="formProfile__modalChange-overlay"></div>
		<div class="formProfile__modalChange-modal">
		<div class ="modalWrapper" >
		{{{ FormDownLoad }}}
		<div class='formDownload__button'>
					{{{ButtonDownload}}}
				</div>

		</div>
		</div>
		`;
		return `

		<div >
		${content}

		</div>
		`;
	}
}
