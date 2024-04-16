import Handlebars from 'handlebars/runtime';
import './profile.scss';
import profile from '/assets/profile.svg';

export { default as Profile } from './profile.hbs?raw';

Handlebars.registerHelper('avatarUrl', () => {
  return profile;
});
