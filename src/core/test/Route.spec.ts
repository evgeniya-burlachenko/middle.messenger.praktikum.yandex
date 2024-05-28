import { expect } from 'chai';
import sinon from 'sinon';


import { Route } from '../Route';
import Block from '../Block';

// Создаем тестовый класс Block для использования в тестах
class MockBlock extends Block {
	getContent() {
		const element = document.createElement('div');
		element.innerHTML = 'Mock content';
		return element;
	}

}

describe('Route', () => {
	let route: Route;
	const props = { rootQuery: '#app' };

	beforeEach(() => {
		// Создание элемента root для рендеринга
		document.body.innerHTML = '<div id="app"></div>';
		// Создание нового экземпляра Route перед каждым тестом
		route = new Route('/test', MockBlock, props);
	});

	afterEach(() => {
		// Очистка jsdom после каждого теста
		sinon.restore();
	});

	describe('constructor', () => {
		// Проверка косвенным способом через публичные методы
		it('should initialize with given pathname and props', () => {
			// Проверяем метод match, который зависит от _pathname
			expect(route.match('/test')).to.be.true;
			expect(route.match('/another-path')).to.be.false;

			// Проверяем метод render, который зависит от _blockClass и _props
			const renderSpy = sinon.spy(route, 'render');
			route.render();
			expect(renderSpy.calledOnce).to.be.true;

			// Проверяем, что блок отрендерился в правильное место
			const root = document.querySelector(props.rootQuery);
			expect(root?.innerHTML).to.not.be.empty;
		});
	});

	describe('navigate', () => {
		it('should update pathname and render if matched', () => {
			const renderSpy = sinon.spy(route, 'render');
			route.navigate('/test');
			expect(route.match('/test')).to.be.true;
			expect(renderSpy.calledOnce).to.be.true;
		});

		it('should not render if pathname does not match', () => {
			const renderSpy = sinon.spy(route, 'render');
			route.navigate('/another-path');
			expect(route.match('/another-path')).to.be.false;
			expect(renderSpy.called).to.be.false;
		});
	});

	describe('match', () => {
		it('should return true for matching pathname', () => {
			expect(route.match('/test')).to.be.true;
		});

		it('should return false for non-matching pathname', () => {
			expect(route.match('/another-path')).to.be.false;
		});
	});

	describe('_render', () => {
		// Тест приватного метода _render для успешного рендеринга
		it('should render block content into the root element', () => {
			const blockInstance = new MockBlock();
			const root = route._render('#app', blockInstance);
			expect(root).to.not.be.null;
			expect(root?.innerHTML).to.not.be.empty;
		});

		// Тест приватного метода _render для случая, когда элемент root не найден
		it('should return null if root element is not found', () => {
			const blockInstance = new MockBlock();
			const root = route._render('#non-existent', blockInstance);
			expect(root).to.be.null;
		});
	});

	describe('render', () => {
		it('should create and render block if not already rendered', () => {
			route.render();

			expect(document.querySelector('#app')?.innerHTML).to.not.be.empty;
		});

		it('should re-render block if already rendered', () => {
			route.render();

			route.render();

			expect(document.querySelector('#app')?.innerHTML).to.not.be.empty;
		});
	});
});


