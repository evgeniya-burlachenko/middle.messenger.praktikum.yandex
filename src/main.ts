import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import './style.css'


const pages = {
  'signIn': [ Pages.LoginPage, {test: '123'} ],
  'signUp': [ Pages.AuthPage,  {test: '123'} ],
  'nav': [ Pages.NavigatePage ],
  'error404': [Pages.ErrorPage404],
  'error500': [Pages.ErrorPage500],
  'download': [Pages.DownloadPage],
  'download-success' : [Pages.DownloadSuccessPage],
  'download-error' : [Pages.DownloadErrorPage],
  'profile': [Pages.Profile],
  "editProfileInformation": [Pages.EditProfileInformation],
  "changePassword": [Pages.ChangePassword],
  "modalUser": [Pages.ModalUser],
  "chat": [Pages.Chat]
  
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
