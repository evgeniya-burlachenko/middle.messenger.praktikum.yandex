import { FormProfile, FormProfileWrapper } from '../../components';
import Block, { IComponentProps } from '../../core/Block';
import Router from '../../core/Router';
import AuthController from '../../core/controllers/AuthController';

export interface IProfile {
	FormProfile: typeof FormProfileWrapper
}

export default class Profile extends Block {
	constructor(props: IProfile) {
		super({
			...props,
			FormProfile: new FormProfileWrapper({
				...props,
				formBodyProfile: new FormProfile({
					FormDataProps: {},
					currentUser: props,
					...props,
				}),
			}),
		});
	}

	componentDidMount() {
		AuthController.fetchUser()
			.then(user => {
				this.props = {...this.props, currentUser: user};
				this.render();
		}).
		catch(() => new Router().go('/'));

	  }
	
	// componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps): boolean {
		
    // 	if(oldProps.currentUser !== newProps.currentUser){
	// 		this.props = newProps;
	// 		this.render();
	// 		return true;
	//   }
	//   return false;
	// }
	render(): string {
		return `
			<div>
				{{{ FormProfile }}}
			</div>
        `;
	}
}
