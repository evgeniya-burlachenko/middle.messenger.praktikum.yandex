import Block from '../../core/Block';

interface IInput{

}
class Input extends Block {
	constructor(props: IInput) {
		super(props);
	}

	render(): string {
		return `
            <input
                class="input__element"
                placeholder=""
            />
        `;
	}
}

export default Input;