import Block from '../../../../core/Block';


class ErrorLineProfile extends Block {
	render(): string {
		return (`
            <div class="inputProfile__text-error">{{errorText}}</div>
        `);
	}
}

export default ErrorLineProfile;
