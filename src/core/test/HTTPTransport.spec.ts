import sinon,  {
	SinonFakeXMLHttpRequest,
	SinonFakeXMLHttpRequestStatic,
}from 'sinon';
import HTTPTransport from '../HTTPTransport';
import { expect } from 'chai';

describe('HTTPTransport', () => {
	let transport: HTTPTransport;
	let mockXhr: SinonFakeXMLHttpRequestStatic;
	let request: SinonFakeXMLHttpRequest;

	beforeEach(() => {

		mockXhr = sinon.useFakeXMLHttpRequest();
		// @ts-expect-error - some properties missing
		global.XMLHttpRequest = mockXhr;
		mockXhr.onCreate = req => {
		  request = req;
		};
		transport = new HTTPTransport('/test');
	});
	afterEach(() => {
		sinon.restore();
	});
	  describe('constructor', () => {
		it('should construct the correct endpoint', () => {
			expect(transport['endpoint']).to.equal('https://ya-praktikum.tech/api/v2/test');
		});
	  });
	describe('get', () => {
		beforeEach( () => {
			  transport.get('/user1');
		  });
		it('should send GET request',  () => {
			 expect(request.method).to.equal('GET');
			expect(request.url).to.equal('https://ya-praktikum.tech/api/v2/test/user1');
		});
	});
	describe('post', () => {
		beforeEach( () => {
			 transport.post('/new_post');
		  });
		it('should send post request', () => {
			expect(request.method).to.equal('POST');
			expect(request.url).to.equal('https://ya-praktikum.tech/api/v2/test/new_post');
		});
	});
	describe('put', () => {
		beforeEach( () => {
			 transport.put('/edit_post');
		  });
		it('should send put request', () => {
			expect(request.method).to.be.equal('PUT');
			expect(request.url).to.equal('https://ya-praktikum.tech/api/v2/test/edit_post');
		});
	});

});
