import Block from '../../core/Block';
import { Button } from '../ui/button';
import { Title } from '../ui/title';
import { TYPE_BUTTON } from '../ui/button/button';
import { InputFile } from '../ui/input/inputFile';


interface IFormDownload {
	title?: string,
	isVisibleFile?: boolean,
	onChange?: (e: Event) => void,
	fileName?: string
}

export default class FormDownload extends Block {
	constructor(props: IFormDownload) {
		super({...props,
			isError: false,
			TitleDownload: new Title({
				title: 'Загрузите файл',
			}),
			InputDownload: new InputFile({
				title: 'Выбрать файл на компьютере',
				type: 'file',
				onChange: props.onChange,
			}),
			TitleDownloadSuccess: new Title({
				title:  'Файл загружен',
			}),
			TitleDownloadError: new Title({
				title:  'Ошибка, попробуйте ещё раз',
				textError: 'true',
			}),
			ButtonDownload: new Button({
				label: 'Закрыть Х',
				style: TYPE_BUTTON.PRIMARY,
				onClick: (e: MouseEvent)=> this.handleFileUpload(e),
			}),
		});
		this.handleFileUpload = this.handleFileUpload.bind(this);

	}

	private handleFileUpload(event: MouseEvent){
		event.preventDefault();
		this.setProps({isVisibleFile: true});
	}

	render() {
		const { isVisibleFile, isError, fileName } = this.props;

		let titleComponent = '';
		let modalContent = '';
		const modalWarning = 'Для корректной работы после закрытия модального окна перезагрузите страницу';
		if (!isError && fileName) {
			titleComponent = '{{{TitleDownloadSuccess}}}';
			modalContent = fileName as string;
		} else if (isError) {
			titleComponent = '{{{TitleDownloadError}}}';
		} else {
			titleComponent = '{{{TitleDownload}}}';
		}

		if(fileName && !isError){
			modalContent = fileName as string;
		}else if (isError && isVisibleFile) {
			modalContent = '{{{ InputDownload }}}';
		} else {
			modalContent = '{{{ InputDownload }}}';
		}


		return `
			<div class = 'formDownload'>
				${titleComponent}
				<div class='formDownload__content'>
					${modalContent}
				</div>
				${modalWarning}
			</div>
		`;
	}
}

