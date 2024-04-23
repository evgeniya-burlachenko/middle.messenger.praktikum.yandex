import Block from "../../../core/Block"

interface IImage{

}

export default class Image extends Block{
	constructor(props: IImage){
		super(props);
	}

	render(){
		return(`
            <div class="imageContainer__{{size}}">
                <img 
                class="image"
                >
            </div>
        `);
	}
}
