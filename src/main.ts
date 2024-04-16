// import Handlebars from 'handlebars';
// import * as Components from './components';
// import * as Pages from './pages';
// import './style.css';

// type PageMap = {
// 	[key: string]: (string | { test: string; })[]
// }
// const pages: PageMap = {
//   'signIn': [ Pages.LoginPage, {test: '123'} ],
//   'signUp': [ Pages.AuthPage,  {test: '123'} ],
//   'nav': [ Pages.NavigatePage ],
//   'error404': [Pages.ErrorPage404],
//   'error500': [Pages.ErrorPage500],
//   'download': [Pages.DownloadPage],
//   'download-success' : [Pages.DownloadSuccessPage],
//   'download-error' : [Pages.DownloadErrorPage],
//   'profile': [Pages.Profile],
//   'editProfileInformation': [Pages.EditProfileInformation],
//   'changePassword': [Pages.ChangePassword],
//   'modalUser': [Pages.ModalUser],
//   'chat': [Pages.Chat],
//   'addUser': [Pages.AddUser],

// };

// Object.entries(Components).forEach(([ name, component ]) => {
//   Handlebars.registerPartial(name, component);
// });

// function navigate(page: string){

//   const [ source, context ] = pages[page];
//   const container = document.getElementById('app')!;
//   container.innerHTML = Handlebars.compile(source)(context);
// }

// document.addEventListener('DOMContentLoaded', () => navigate('nav'));

// document.addEventListener('click',( e: Event) => {
//   const target = e.target as HTMLElement;
//   const page = target.getAttribute('page');
//   if (page) {
//     navigate(page);

//     e.preventDefault();
//     e.stopImmediatePropagation();
//   }
// });
import Handlebars from 'handlebars';
import * as Components from './components';
import { registerComponent } from './core/registerComponent';
import { navigate } from './core/navigate';




// Object.entries(Components).forEach(([ name, component ]) => {
//   if(['Input', 'Button'].includes(name)) {
//     registerComponent(name, component);
//     return;
//   }
//   Handlebars.registerPartial(name, component);

// });


Handlebars.registerPartial('FormAuth', Components.FormAuth);

// registerComponent('Button', Components.Button);
// registerComponent('InputField', Components.InputField);
// registerComponent('Input', Components.Input);
// registerComponent('ErrorLine', Components.ErrorLine);
// registerComponent('CatCard', Components.CatCard);
// registerComponent('ListCat', Components.ListCatCards);




document.addEventListener('DOMContentLoaded', () => navigate('signIn'));

