import EventBus from './EventBus';
import Block from './Block';
// import { IMessageProps } from '../components/Message/message';
import { Indexed } from './helpers/merge';
import { set } from './helpers/set';
import { isEqual } from './helpers/isEqual';

export enum StoreEvents {
	Updated = 'updated',
}

export interface IUserData {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
}

interface ILastMessage {
	time: string;
	content: string;
	user?: IUserData,
}

export interface IChatData {
	id: number;
	title: string;
	avatar: string | null;
	created_by: number;
	unread_count: number;
	last_message: ILastMessage;
}

export interface IStoreData {
	currentUser?: IUserData;
	chatList?: IChatData[];
	currentChatId?: string;
	messageList: IMessageProps[];
}
export interface IMessageProps {
	isMyMessage: boolean;
	messageText: string;
	messageDate?: string;
	messageTime?: string;
}

class Store extends EventBus {
	private state: Indexed = {};

	public getState() {
		return JSON.parse(JSON.stringify(this.state));

	}

	public set(path: keyof IStoreData, value: unknown) {
		set(this.state, path, value);
		this.emit(StoreEvents.Updated);
	}


	public clearUserInfo() {
		this.set('currentUser', {});
		this.set('chatList', []);
		this.set('currentChatId', '');
		this.set('messageList', []);
	}
}
export const store = new Store();

export const connect = (mapStateToProps: (state: IStoreData) =>
Record<string, unknown>) => (Component: typeof Block) => {
	let state: Record<string, unknown>;

	return class extends Component {
		constructor(props: object) {
			state = mapStateToProps(store.getState() as IStoreData);

			super({ ...props, ...state });

			const onUpdate = () => {
				const newState = mapStateToProps(store.getState() as IStoreData);

				if (!isEqual(state, newState)) {
					this.setProps({ ...newState });
				}
				state = newState;
			};
			store.on(StoreEvents.Updated, onUpdate);

			this.componentWillUnmount = () => {
				store.off(StoreEvents.Updated, onUpdate);
			};
		}
 	 };
};
