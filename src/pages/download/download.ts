import { FormDownload, ModalWrapper } from '../../components';
import Block from '../../core/Block';

export interface IDownload{
	FormDownLoad?: ModalWrapper
}
export default class Download extends Block {
	constructor(props: IDownload) {
		super({
			...props,
			FormDownLoad: new ModalWrapper({
				modalBody: new FormDownload({}),
			}),
		});
	}
	render() {
		return `
            <div class="download">
                {{{ FormDownLoad }}}
            </div>
        `;
	}
}
