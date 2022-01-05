import {
	EventHubEmitMethodInput,
	EventHubPayload,
	EventHubSubscribeCallback,
	EventHubSubscribeMethodInput,
} from '../../types';

export class EventHub {
	static subscriptions: Record<string, EventHubSubscribeCallback<EventHubPayload>[]> = {};

	static subscribe = <TPayload extends EventHubPayload>({
		key,
		callback,
	}: EventHubSubscribeMethodInput<TPayload>): (() => void) => {
		if (this.subscriptions[key] === undefined) {
			this.subscriptions[key] = [];
		}
		const index = this.subscriptions[key].length;

		this.subscriptions[key].push(callback);

		return (): void => {
			if (this.subscriptions[key]) {
				this.subscriptions[key].splice(index, index + 1);
			}
		};
	};

	static emit = <TPayload extends EventHubPayload>({ key, payload }: EventHubEmitMethodInput<TPayload>): void => {
		(this.subscriptions[key] || []).forEach(fn => {
			fn({ payload, date: new Date() });
		});
	};
}
