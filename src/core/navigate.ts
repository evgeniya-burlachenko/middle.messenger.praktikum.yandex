import * as Pages from '../pages';
import Handlebars from 'handlebars';

const pages = {
	'signIn': Pages.LoginPage,
	// 'signUp': Pages.AuthPage,
	// 'nav': Pages.NavigatePage ,
	// 'error404': Pages.ErrorPage404,
	// 'error500': Pages.ErrorPage500,
	// 'download': Pages.DownloadPage,
	// 'download-success' : Pages.DownloadSuccessPage,
	// 'download-error' : Pages.DownloadErrorPage,
	// 'profile': Pages.Profile,
	// 'editProfileInformation': Pages.EditProfileInformation,
	// 'changePassword': Pages.ChangePassword,
	// 'modalUser': Pages.ModalUser,
	// 'chat': Pages.Chat,
	// 'addUser': Pages.AddUser,
//   'list': Pages.Cats,
};

export function navigate(page: string) {
  const app = document.getElementById('app');
console.log("!!!pages", pages)
console.log("!!!page", page)
  //@ts-ignore
  const Component = pages[page];
  const component = new Component();
  app?.append(component.getContent());
}