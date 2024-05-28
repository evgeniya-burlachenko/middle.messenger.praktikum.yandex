import { expect } from 'chai';

import sinon from 'sinon';
import Block from '../Block.ts';

describe('Block', () => {
	let PageClass: typeof Block;

	before(() => {
		class Page extends Block{
			constructor(props: object){
				super({
					...props,
				});
			}

			render(){
				return(`
                    <div>
                        <span id="test-text">{{text}}</span>
                        <button>{{text-button}}</button>
                    </div>
                `);
			}
		}
		PageClass = Page;
	});

	// написать тест на то что комопнент создается с переданными пропсами
	it('should create a component with a state from the constructor', () => {
		const text = 'Hello';
		const pageComponent = new PageClass({text});

		const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

		expect(spanText).to.be.eq(text);

	});
	// проверить что реактивность у копонента работает
	it('should demonstrate reactive behavior', () => {
		const text = 'new value';
		const pageComponent = new PageClass({text: 'Hello'});

		pageComponent.setProps({text});
		const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

		expect(spanText).to.be.eq(text);

	});
	// проверить что комопнент навешивает события
	it('should attach events to the component', () => {
		const handlerStub = sinon.stub();
		const pageComponent = new PageClass({events: {
			click: handlerStub,
		}});

		const event = new MouseEvent('click');
		pageComponent.element?.dispatchEvent(event);

		expect(handlerStub.calledOnce).to.be.true;
	});


	it('should trigger componentDidMount lifecycle method', () => {
		const componentDidMountSpy = sinon.spy(PageClass.prototype, 'componentDidMount');
		const pageComponent = new PageClass({text: 'Hello'});

		pageComponent.dispatchComponentDidMount();

		expect(componentDidMountSpy.calledOnce).to.be.true;
		componentDidMountSpy.restore();
	});

	it('should display the component', () => {
		const pageComponent = new PageClass({text: 'Hello'});
		pageComponent.hide();
		pageComponent.show();
		expect(pageComponent.element?.style.display).to.equal('block');
	});

	it('should hide the component', () => {
		const pageComponent = new PageClass({text: 'Hello'});
		pageComponent.show();
		pageComponent.hide();
		expect(pageComponent.element?.style.display).to.equal('none');
	});

	it('should trigger componentDidUpdate when props change', () => {
		const componentDidUpdateSpy = sinon.spy(PageClass.prototype, 'componentDidUpdate');
		const pageComponent = new PageClass({text: 'Hello'});
		pageComponent.setProps({text: 'Updated Text'});
		expect(componentDidUpdateSpy.calledOnce).to.be.true;
		componentDidUpdateSpy.restore();
	});

	it('should correctly handle adding events', () => {
		const eventStub = sinon.stub();
		const pageComponent = new PageClass({
			events: {
				click: eventStub,
			},
		});

		const event = new MouseEvent('click');
		pageComponent.element?.dispatchEvent(event);

		pageComponent._addEvents();
		pageComponent.element?.dispatchEvent(event);
		expect(eventStub.calledTwice).to.be.true;
	});

	it('should correctly handle removing events', () => {
		const eventStub = sinon.stub();
		const pageComponent = new PageClass({
			events: {
				click: eventStub,
			},
		});

		const event = new MouseEvent('click');
		pageComponent.element?.dispatchEvent(event);

		pageComponent._removeEvents();
		pageComponent.element?.dispatchEvent(event);
		expect(eventStub.calledOnce).to.be.true;

	});
	it('should render component content correctly', () => {
		const text = 'Hello';
		const pageComponent = new PageClass({text});

		const renderedContent = pageComponent.render();
		expect(renderedContent).to.contain('<span id="test-text">{{text}}</span>');

	});
	it('should correctly update component', () => {
		const newText = 'Hello';
		const pageComponent = new PageClass({newText});

		pageComponent.setProps({text: newText});
		const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;
		expect(spanText).to.be.equal(newText);
	});


});
