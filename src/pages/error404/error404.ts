import { ErrorTemplate } from '../../components/error';
import Block from '../../core/Block';

export interface IErrorPage404{

}
export default class ErrorPage404 extends Block{
	constructor(props: IErrorPage404){
		super({
			...props,
			Error: new ErrorTemplate({
				code: '404',
				message:'Не туда попали',
				label: 'Назад к чатам',
				type: 'link',
				page: 'chat',
			}),
		});
	}
	render():string{
		return `
			<div class="error">	
				{{{ Error }}}
			</div>
		`;
	}
}
