import Handlebars from 'handlebars';
import './listUsers.scss';
import cat1 from '../../../public/assets/01.jpg';
import cat2 from '../../../public/assets/02.jpg';
import cat3 from '../../../public/assets/03.jpg';

export { default as ListUsers } from './listUsers.hbs?raw';

Handlebars.registerHelper('cats', () => {
	return [
		{name: 'cat-1', avatar: cat1},
		{name: 'cat-2', avatar: cat2, active: true},
		{name: 'cat-3', avatar: cat3},
	];
});
