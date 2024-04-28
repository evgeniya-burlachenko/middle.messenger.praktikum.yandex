import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import './style.scss';
import { ILoginPageProps } from './pages/signIn/signIn';
import { IAuthPageProps } from './pages/signUp/signUp';
import { IErrorPage404 } from './pages/error404/error404';
import { IErrorPage500 } from './pages/error500/error500';
import { IDownload } from './pages/download/download';
import { IProfile } from './pages/profile/profile';
import { IEditProfile } from './pages/editProfileInformation/editProfileInformation';
import { IChangePassword } from './pages/changePassword/changePassword';
import { IAddUser } from './pages/addUser/addUser';

interface IPageConfig{
	inputs?: string[]
}
interface IPagesMap {
	[key: string]: [
		typeof  Pages.LoginPage |
		typeof  Pages.AuthPage |
		typeof  Pages.NavigatePage |
		typeof  Pages.ErrorPage404 |
		typeof  Pages.ErrorPage500 |
		typeof  Pages.Download |
		typeof  Pages.Profile |
		typeof  Pages.EditProfileInformation |
		typeof  Pages.ChangePassword |
		typeof  Pages.AddUser,
		IPageConfig
	]
}
const pages: IPagesMap = {
	'signIn': [ Pages.LoginPage, {inputs: ['label 1', 'label 2', 'label 3']} ],
	'signUp': [ Pages.AuthPage, {inputs: ['label 1', 'label 2', 'label 3']} ],
	'nav': [ Pages.NavigatePage, {inputs: ['label 1', 'label 2', 'label 3']}  ],
	'error404': [Pages.ErrorPage404, {inputs: ['label 1', 'label 2', 'label 3']} ],
	'error500': [Pages.ErrorPage500, {inputs: ['label 1', 'label 2', 'label 3']} ],
	'download': [Pages.Download, {inputs: ['label 1', 'label 2', 'label 3']} ],
	'profile': [Pages.Profile, {inputs: ['label 1', 'label 2', 'label 3']} ],
	'editProfileInformation': [Pages.EditProfileInformation, {inputs: ['label 1', 'label 2', 'label 3']} ],
	'changePassword': [Pages.ChangePassword, {inputs: ['label 1', 'label 2', 'label 3']} ],
	'chat': [Pages.Chat, {inputs: ['label 1', 'label 2', 'label 3']} ],
	'addUser': [Pages.AddUser, {inputs: ['label 1', 'label 2', 'label 3']} ],

};

Object.entries(Components).forEach(([ name, component ]) => {
	if(typeof component === 'string'){
		  Handlebars.registerPartial(name, component);
	}
});

export function navigate(page: string) {
	const [ source, context ] = pages[page];
	const container = document.getElementById('app')!;

	if(source instanceof Object) {
		const pageInstance = new source(context as ILoginPageProps & IAuthPageProps & IErrorPage404 & IErrorPage500 & IDownload & IProfile & IEditProfile & IChangePassword & IAddUser);
		container.innerHTML = '';
		const content = pageInstance.getContent();
		if(content !== null){
			container.append(content);
		}
		else{
			console.error('Element with id `app` not found on the page');
		}
		// page.dispatchComponentDidMount();
		return;
	}
	container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('chat'));

document.addEventListener('click', e => {
	const target = e.target as HTMLElement;
	const page = target.getAttribute('page');
	if (page) {
		navigate(page);

		e.preventDefault();
		e.stopImmediatePropagation();
	}
});
