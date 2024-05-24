type EventName = string;
type EventCallback<Args extends unknown[]> = (...args: Args) => void;

interface ListenersMap {
	[event: string]: EventCallback<unknown[]>[];
}

export default class EventBus {
	private listeners: ListenersMap;

	constructor() {
		this.listeners = {};
	}

	on(event: EventName, callback: EventCallback<unknown[]>): void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}
		this.listeners[event].push(callback);
	}

	off(event: EventName, callback: EventCallback<unknown[]>): void {
		if (!this.listeners[event]) {
			throw new Error(`Нет события: ${event}`);
		}
		this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
	}

	emit(event: EventName, ...args: unknown[]): void {
		if (!this.listeners[event]) {
			return;
		}
		this.listeners[event].forEach(listener => {
			listener(...args);
		});
	}
}
