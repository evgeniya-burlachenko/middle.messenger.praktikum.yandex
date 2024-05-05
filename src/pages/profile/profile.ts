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
	// componentDidMount() {
	// 	AuthController.fetchUser().catch(() => new Router().go('/'));
	//   }
	componentDidMount() {
		AuthController.fetchUser().catch(() => new Router().go('/'));

	  }
	// async componentDidMount() {
	// 	try{
	// 		console.log("componentDidMount")
	// 		await AuthController.fetchUser()
	// 	} catch(error){
	// 		new Router().go('/')
	// 		console.error("Error fetching")
	// 	}
	// }
	componentDidUpdate(oldProps: IComponentProps, newProps: IComponentProps): boolean {
		
    	if(oldProps.currentUser !== newProps.currentUser){
			console.log("!!!props1", this.props)
			this.props = newProps;
			this.render();
			console.log("!!!props2", this.props)
			return true;
	  }
	  return false;
	}
	render(): string {
		console.log("!!1pro1", this.props)
		return `
			<div>
				{{{ FormProfile }}}
			</div>
        `;
	}
}
