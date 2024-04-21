import Block from '../../core/Block';

interface InputProfileProps {

}
class InputProfile extends Block {
	constructor(props: InputProfileProps) {
		super(props);
	}

	render(): string {
		return (`
            <input
                class="inputProfile__element"
				{{#if value}} value={{value}} {{/if}}
				{{#if disabled}} disabled={{disabled}} {{/if}}
				{{#if type}} type={{type}} {{/if}}
		
		
            />
        `);
	}
}

export default InputProfile;
