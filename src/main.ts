import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import './style.scss';
import Router from './core/Router';

Object.entries(Components).forEach(([ name, component ]) => {
	if(typeof component === 'string'){
		  Handlebars.registerPartial(name, component);
	}
});

const router = new Router();
// export const ws = new WS();

router.use('/', Pages.LoginPage)
  .use('/sign-up', Pages.AuthPage)
  .use('/settings', Pages.Profile)
  .use('/settings-edit', Pages.EditProfileInformation)
  .use('/password-edit', Pages.ChangePassword)
  .use('/messenger', Pages.Chat)
  .use('/error500', Pages.ErrorPage500)
  .use('*', Pages.ErrorPage404)
  .use('/sign-in', Pages.LoginPage);

router.start();


