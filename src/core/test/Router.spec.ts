import { expect } from 'chai';
import sinon from 'sinon';


// import { Route } from '../Route';
import Block from '../Block';
import Router from '../Router';
import { Route } from '../Route';
// import { match } from 'assert';

// Создаем тестовый класс Block для использования в тестах
class MockBlock extends Block {
	getContent() {
		const element = document.createElement('div');
		element.innerHTML = 'Mock content';
		return element;
	}

}

describe('Route', () => {
	let router: Router;

	beforeEach(() => {
		router = new Router();
	});
	afterEach(() => {
		sinon.restore();
	});

	describe('use', () => {
		it('should add a route to the router', () => {
			router.use('/test', MockBlock);
			// expect(router.routes).to.have.lengthOf(1);
			// expect(router.routes[0]).to.be.instanceOf(Route);
		});
		it('should return the router instance for chaining', () => {
			const result = router.use('/test', MockBlock);

			expect(result).to.equal(router);
		});

	});
	describe('start', () => {
		it('shold set up onpopstate event listener' , () => {
			const pushStateStub = sinon.stub(window.history, 'pushState');
			const replaceStateStub = sinon.stub(window.history, 'replaceState');

			router.start();
			expect(pushStateStub.calledOnce).to.be.true;
			expect(replaceStateStub.calledOnce).to.be.false;
		});
	});
	describe('go', () => {
		it('should navigate to a new route and call _onRoute', () => {
			// const onRouteSpy = sinon.spy(router, '_onRoute');
			sinon.stub(window.history, 'pushState');
			 sinon.stub(window.history, 'replaceState');
			router.use('/test', MockBlock);
			router.start();

			router.go('/test');

			// expect(onRouteSpy.calledWith('/test')).to.be.true;
		});
	});
	describe('back and forward', () => {
		it('should call history.back when is called', () => {

			const historyBackdSpy = sinon.spy(window.history, 'back');

			router.back();


			expect(historyBackdSpy.calledOnce).to.be.true;
		});
		it('should call history.forward when is called', () => {
			const historyForwardSpy = sinon.spy(window.history, 'forward');

			router.forward();
			router.back();

			expect(historyForwardSpy.calledOnce).to.be.true;

		});
		describe('getRoute', () => {
			it('should return the correct route for a given pathname', () => {
				router.use('/test', MockBlock);
				const route = router.getRoute('/test');
				expect(route).to.be.instanceOf(Route);
				expect(route?.match('/test')).to.be.true;
			});
			it('should return undefined for a non-existent route',() => {
				const route = router.getRoute('/non-existent');
				expect(route).to.be.undefined;
			});
			it('should return the default route for an unmatched pathaname', () => {
				router.use('*', MockBlock);
				const route = router.getRoute('/any-path');
				expect(route).to.be.instanceOf(Route);
				expect(route?.match('*')).to.be.true;
			});
		});
	});


});

