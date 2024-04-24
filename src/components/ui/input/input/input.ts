import Block from '../../../../core/Block';


interface IInput{

}
class Input extends Block {
	constructor(props: IInput) {
		super(props);
	}

	render(): string {
		return `
            <input
                class='input__element'
				{{#if value}} value={{value}} {{/if}}
				{{#if disabled}} disabled={{disabled}} {{/if}}
				{{#if type}} type={{type}} {{/if}},
				name={{{name}}}
            />
        `;
	}
}

export default Input;
