import Block from '../../../../core/Block';
import InputFile from '../../../ui/input/inputFile/input';
import attachFile from '../../../../assets/icons/attachFile.svg';
import attachMedia from '../../../../assets/icons/attachMedia.svg';
import attachLocation from '../../../../assets/icons/attachLocation.svg'

interface IAttachModal{

}
export default class AttachModal extends Block{
	constructor(props: IAttachModal) {
		super({...props,
			isVisibleFile: false,
			isError: false,
			InputDownloadFoto: new InputFile({
				title: 'Фото или Видео',
				type: 'file',
				style: 'attach',
			}),
			InputDownloadFile: new InputFile({
				title: 'Файл',
				type: 'file',
				style: 'attach',
			}),
		});
	}


	render(){
		return(`
			<div class="modalAttach">
			<div class="modalAttach__attachment">
				<img 
				class="modalAttach__attachment--icon"
				src=${attachMedia}></img>
				{{{InputDownloadFoto}}}
			</div>
				<div class="modalAttach__attachment">
			<img 
				class="modalAttach__attachment--icon"
				src=${attachFile}></img>
			{{{InputDownloadFile}}}
			</div>
			<div class="modalAttach__attachment">
				<img 
				class="modalAttach__attachment--icon"
				src=${attachLocation}></img>
				<p class="modalAttach__text">Локация</p>
			</div>
		</div>
		`)
	}
}
