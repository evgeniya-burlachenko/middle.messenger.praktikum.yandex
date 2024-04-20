import { Link } from '../link';
import Block from '../../core/Block';
import { Button } from '../button';
import { Title } from '../title';
import { TYPE_BUTTON } from '../button/button';

interface IFormDownload {
	title?: string,
	isVisibleFile?: boolean
}

export default class FormDownload extends Block {
	constructor(props: IFormDownload) {
		super({...props,
			isVisibleFile: false,
			isError: false,
			 TitleDownload: new Title({
				title: 'Загрузите файл',
			}),
			TitleDownloadSuccess: new Title({
				title:  'Файл загружен',
			}),
			TitleDownloadError: new Title({
				title:  'Ошибка, попробуйте ещё раз',
				textError: 'true',
			}),
			ButtonDownload: new Button({
				label: 'Поменять',
				type: TYPE_BUTTON.PRIMARY,
				onClick: (e: MouseEvent)=> this.handleFileUpload(e),
			}),
			ButtonChange: new Button({
				label: 'Поменять',
				type: TYPE_BUTTON.PRIMARY,
				onClick: (e: MouseEvent)=> this.handleFileChange(e),
			}),
			LinkDownload: new Link({
				label: 'Выбрать файл на компьютере',
			}),
		});
		this.handleFileUpload = this.handleFileUpload.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
	}

	private handleFileUpload(event: MouseEvent){
		event.preventDefault();
		this.setProps({isVisibleFile: true});
	}
	private handleFileChange(event: MouseEvent){
		event.preventDefault();
		this.setProps({isError: true});
	}

	render() {
		const { isVisibleFile, isError } = this.props;
		const buttonDownload = isVisibleFile ? '{{{ ButtonChange }}}' : '{{{ ButtonDownload }}}';
		let titleComponent = '';
		let modalContent = '';

		if (isVisibleFile && !isError) {
			titleComponent = '{{{TitleDownloadSuccess}}}';
		} else if (isError && isVisibleFile) {
			titleComponent = '{{{TitleDownloadError}}}';
		} else {
			titleComponent = '{{{TitleDownload}}}';
		}

		if(isVisibleFile && !isError){
			modalContent = 'pic.jpg';
		}else if (isError && isVisibleFile) {
			modalContent = '{{{ LinkDownload }}}';
		} else {
			modalContent = '{{{ LinkDownload }}}';
		}


		return `
			<div class = 'formDownload'>
				${titleComponent}
				<div class='formDownload__content'>
					${modalContent}
				</div>
				<div class='formDownload__button'>
					${buttonDownload} 
				</div>
			</div>
		`;
	}
}
