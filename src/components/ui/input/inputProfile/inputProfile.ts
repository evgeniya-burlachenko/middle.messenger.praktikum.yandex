import Block from '../../../../core/Block';

interface InputProfileProps {

}
class InputProfile extends Block {
	constructor(props: InputProfileProps) {
		super(props);
	}
	componentDidUpdate(oldProps: object, newProps: object): boolean {
		if(oldProps === newProps) {
			return false;
		}
		// this.children.ErrorLine.setProps(newProps);
		return true;
	}
	render(): string {
		return (`
            <input
                class='inputProfile__element'
				{{#if value}} value={{value}} {{/if}}
				{{#if disabled}} disabled={{disabled}} {{/if}}
				{{#if type}} type={{type}} {{/if}}
				name={{{name}}}
            />
        `);
	}
}

export default InputProfile;
