import Block, { RefType } from "../../core/Block";
import { navigate } from "../../core/navigate";
import * as validators from '../../utils/validators';

export class LoginPage extends Block<object, RefType> {
    constructor() {
        super({
            validate: {
                login: validators.login
            },
            onLogin: (event: any) => {
                event.preventDefault();
				// const login =  this.refs.login.value();
                // const password =  this.refs.password.value();
                const loginInput =  this.refs.login as HTMLInputElement;
				const login = loginInput.value
                const passwordInput=  this.refs.password as HTMLInputElement;
				const password = passwordInput.value
                // this.setProps({a: 1})

                if(!login) {
                    return;
                }

                console.log({
                    login,
                    password
                })
                // navigate('list')
            }
        });
    }
    protected render(): string {
        return(`
			<div class="signIn">
				{{#> FormAuth}}
					{{{ Title title="Вход"}}}
					{{{ Input label="Логин" type="text" name="login" }}} 
					{{{ Input label="Пароль" type="password" name="password"
					data-message = "Неправильный пароль" invalidPassword=true }}}
					{{{ Button label="Авторизоваться" type="primary" }}}
					{{{ Button label="Нет аккаута?" type="link" }}}
				{{/FormAuth}}
			</div>
        `)
    }
}