import Block from '../../../core/Block';
import { Button } from '../../ui/button';

import * as validationUtils from '../../../utils/validationUtils';
import { TYPE_BUTTON } from '../../ui/button/button';
import {Input} from '../../ui/input/input';
import { INPUT_TYPE } from '../../ui/input/input/inputElement';

interface IFormData{
	[key: string]: string
}
interface IErrors {
	[key: string]: boolean
}
interface IUserActions {
	title?: string;
	label?: string;

}
export default class UserActions extends Block {
	private formData: IFormData = {};
	private errors: IErrors = {};
	constructor(props: IUserActions) {
		super({...props});
	}
	init() {
		const onBlurHandler = this.onBlurHandler.bind(this);
		const onLoginHandler = this.onLoginHandler.bind(this);
		const label =  this.props.label as string;

		const InputLogin = new Input({
			label: 'Логин',
			onBlur:  (e: FocusEvent) => onBlurHandler(e, 'login'),
			name: INPUT_TYPE.LOGIN,
		});
		const ButtonLogin = new Button({
			label: label,
			style: TYPE_BUTTON.PRIMARY,
			onClick: onLoginHandler,
			onSubmit: onLoginHandler,
		});

		this.children = {
			...this.children,
			InputLogin,
			ButtonLogin,

		};
	}
	onBlurHandler(e: FocusEvent, field: string){
		const target = e.target as HTMLInputElement;
		const inputValue = target.value.trim();
		const errors = {...this.errors};
		const validationFunctions: {[key: string]: (value: string) => boolean} = {
			login: validationUtils.validateLogin,

		};
		const validationFunction = validationFunctions[field];
		if(validationFunction){
			errors[field] = !validationFunction(inputValue);
		}
		this.errors = errors;
		this.formData[field] = inputValue;
		const inputComponent = this.children[`Input${field.charAt(0).toUpperCase() + field.slice(1)}`];
		inputComponent.setProps({ error: errors[field], errorText: errors[field] ? 'Форма содержит ошибки. Пожалуйста, исправьте их' : '' });
	}
	onLoginHandler(event: MouseEvent){
		event.preventDefault();
		const hasErrors = Object.values(this.errors).some(error=> error);
		if(hasErrors){
			console.log('Форма содержит ошибки. Пожалуйста, исправьте их');
			return;
		}
		console.log('Данные формы:', this.formData);
	}

	render() {
		return (
        	`<div class = "formUserActions">
				{{{title}}}
				<div class="formUserActions__content">
					{{{ InputLogin }}}
				</div>
				<div class = "formUserActions__button">
					{{{ ButtonLogin }}}
				</div>
			</div>`
		);
	}
}
