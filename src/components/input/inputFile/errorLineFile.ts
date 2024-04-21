import Block from '../../../core/Block';

class ErrorLineFile extends Block {
	render(): string {
		return (`
            <div class="input__text-error">{{errorText}}</div>
        `);
	}
}

export default ErrorLineFile;
