import EventBus from './EventBus';
import {nanoid} from 'nanoid';
import Handlebars from 'handlebars';

type EventHandler = (event: Event) => void;

interface IBlock {
    [key: string]: unknown;
    events?: { [key: string]: EventHandler };
}

export interface IComponentProps {
	events?: { [eventName: string]: (e: Event) => void }
	withId?: boolean;
	[prop: string]: unknown;
}

export default class Block {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};
	public _id: string = nanoid(6);
	public props: IComponentProps;

	public children: Record<string, Block>;
	private eventBus: () => EventBus;
	private _element: HTMLElement | null = null;
	// private _meta: IBlockMeta | null = null;


	/** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */

	// private _eventbus: EventBus;
	// private eventBus: () => EventBus;

	constructor(propsWithChildren: unknown = {}) {
		const eventBus = new EventBus();
		const {props, children} = this._getChildrenAndProps(propsWithChildren);
		this.props = this._makePropsProxy({ ...props });
		this.children = children;

		this.eventBus = () => eventBus;

		this._registerEvents(eventBus);

		eventBus.emit(Block.EVENTS.INIT);
	}
	updateFormType(type: string){
		this.setProps({type});
		this.render();
	}
	private _addEvents() {
		const {events = {}} = this.props as { events: Record<string, () => void> };

		Object.keys(events).forEach(eventName => {
			this._element?.addEventListener(eventName, events[eventName]);
		});
	}

	_registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	// _createResources() {
	// 	const { tagName } = this._meta;
	// 	this._element = this._createDocumentElement(tagName);
	// }

	private _init() {
		this.init();

		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	init() {

	}

	private _componentDidMount() {
		this.componentDidMount();
		console.log('CDM');

		Object.values(this.children).forEach(child => {
			child.dispatchComponentDidMount();
		});
	}

	componentDidMount(oldProps?: IBlock) {
		console.log(oldProps);
	}

	dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	private _componentDidUpdate(oldProps: unknown, newProps: unknown ) {
		const response = this.componentDidUpdate(oldProps as IBlock, newProps as IBlock);
		if (!response) {
			return;
		}
		this._render();
	}

	componentDidUpdate(oldProps: IBlock, newProps: IBlock) {
		console.log(oldProps, newProps);
		return true;
	}

	private _getChildrenAndProps(propsAndChildren: unknown) {
		const props: Record<string, unknown> = {};
		const children: Record<string, Block> = {};

		Object.entries(propsAndChildren as object).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { children, props };
	}

	setProps = (nextProps: object) => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};
	setState = (nextProps: object) => {
		if (!nextProps) {
			return;
		}
		Object.assign(this.props, nextProps);
	};

	get element() {
		return this._element;
	}

	private _render(){
		const propsAndStubs = { ...this.props };
		Object.entries(this.children).forEach(([key, child]) => {
			propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
		});
		const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
		fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
		const newElement = fragment.content.firstElementChild as HTMLElement;
		Object.values(this.children).forEach((child) => {
			const stub= fragment.content.querySelector(`[data-id="${child._id}"]`);
			if (stub){
				stub?.replaceWith(child.getContent()!);
			}
		});

		if (this._element ) {
			this._element.replaceWith(newElement);
		}

		this._element = newElement;

		this._addEvents();
	}

	render() {}

	getContent() {
		return this.element;
	}

	_makePropsProxy(props: IComponentProps) {
		// Можно и так передать this
		// Такой способ больше не применяется с приходом ES6+
		// const self = this;

		return new Proxy(props, {
			get: (target, prop: string): unknown => {
				const value: unknown = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set: (target, prop: string, value: string) => {
				const oldTarget = {...target};
				target[prop] = value;

				// Запускаем обновление компоненты
				// Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
				this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		});
	}

	private _createDocumentElement(tagName: string) {
		// Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
		return document.createElement(tagName);
	}
}
