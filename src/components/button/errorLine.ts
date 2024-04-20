import Block from '../../core/Block';

class ErrorLine extends Block {
	render(): string {
		return (`
            <div class="button__text-error">{{errorText}}</div>
        `);
	}
}

export default ErrorLine;
