import Block from '../../../../core/Block';


interface IInputFile{
	style?: string;
	title?: string;
	type?: string

}
class InputFile extends Block {
	constructor(props: IInputFile) {
		super(props);
	}

	render(): string {
		const {style} = this.props;
		return (`
		${style ? `<div class = 'inputFile'>
			<label for='file-input' class='inputFile__label'>
				<span class = 'inputFile__label--attach'>
				{{{title}}}
				</span>
				<input
				id='file-input'
				class='inputFile__label--content'
				type = 'file'
				/>
				</label>
				</div>` :
				`<div class = 'inputFile'>
				<label for='file-input' class='inputFile__label'>
					<span class = 'inputFile__label--title'>
					{{{title}}}
					</span>
					<input
					id='file-input'
					class='inputFile__label--content'
					type = 'file'
				/>
				</label>
				</div>`}
			
        `);
	}
}

export default InputFile;
