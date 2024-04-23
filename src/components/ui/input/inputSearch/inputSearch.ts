import Block from '../../../../core/Block';


interface IInputSearch{

}
class InputSearch extends Block {
	constructor(props: IInputSearch) {
		super(props);
	}

	render(): string {
		return `
            <input
                class='inputSearch'
                placeholder="Поиск",
				type = "search"
            />
        `;
	}
}

export default InputSearch;
