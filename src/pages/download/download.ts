import { Button, FormDownload, ModalWrapper } from '../../components';
import { TYPE_BUTTON } from '../../components/ui/button/button';
import Block, { IComponentProps } from '../../core/Block';
import UserController from '../../core/controllers/UserController';

export interface IDownload{
	FormDownLoad?: ModalWrapper
}
export default class Download extends Block {
	modal: ModalWrapper;
	constructor(props: IDownload) {
		super({
			...props,
			ButtonDownload: new Button({
				label: 'Закрыть Х',
				style: TYPE_BUTTON.PRIMARY,
				onClick: (e: MouseEvent)=> this.handleFileUpload(e),
			}),
			FormDownLoad: new ModalWrapper({
				modalBody: new FormDownload({ isVisibleFile: false}),
				onClick: () => {



				},
				onChange: (e: any) => {
					const file = e.target.files[0];
					const formData = new FormData();
			  		const fileName = file.name
					// const 	isVisibleFile = false
					formData.append('avatar', file);
					UserController.changeAvatar(formData);
					this.children.FormDownLoad.children.modalBody.setProps({fileName})
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
		const content = this.props.isVisibleFile ? "" : `       
		<div class="formProfile__modalChange-overlay"></div>
		<div class="formProfile__modalChange-modal">
		<div class ="modalWrapper" >
		{{{ FormDownLoad }}}
		<div class='formDownload__button'>
					{{{ButtonDownload}}}
				</div>

		</div>
		</div>
		`
		return `

            <div >
		${content}

            </div>
        `;
	}
}
