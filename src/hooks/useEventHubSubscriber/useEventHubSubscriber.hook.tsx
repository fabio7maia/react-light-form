import React from 'react';
import { EventHub } from '../../helpers';
import { EventHubPayload, EventHubSubscribeCallbackData, EventHubSubscribeMethodInput } from '../../types';

type UseEventHubSubscriberInputOptions = {
	refresh?: boolean;
};

type UseEventHubSubscriberInput<TPayload extends EventHubPayload> = EventHubSubscribeMethodInput<TPayload> & {
	options?: UseEventHubSubscriberInputOptions;
};

type UseEventHubSubscriberOutput<TPayload extends EventHubPayload> = {
	payload: EventHubSubscribeCallbackData<TPayload>;
	unsubscribe: () => void;
};

export const useEventHubSubscriber = <TPayload extends EventHubPayload>({
	callback,
	key,
	options,
}: UseEventHubSubscriberInput<TPayload>): UseEventHubSubscriberOutput<TPayload> => {
	const { refresh = true } = options || {};
	const initialized = React.useRef(false);
	const unsubscribe = React.useRef<() => void>();
	const [payload, setPayload] = React.useState<any>(undefined);

	if (!initialized.current) {
		initialized.current = true;

		const innerCallback = (payload: any): void => {
			if (refresh) {
				setPayload(payload);
			}

			callback(payload);
		};

		unsubscribe.current = EventHub.subscribe({ key, callback: innerCallback });
	}

	React.useEffect(() => {
		return unsubscribe.current;
	}, []);

	return {
		payload,
		unsubscribe: unsubscribe.current,
	};
};
