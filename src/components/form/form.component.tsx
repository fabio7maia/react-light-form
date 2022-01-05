import React from 'react';
import {
	getUseFormEventHubKey,
	useEventHubSubscriber,
	useForm,
	UseFormEventHubPayloadData,
	useLogger,
} from '../../hooks';
import { FormValues } from '../../types';

export const formContext = React.createContext({
	name: '',
});

export interface FormProps {
	name?: string;
	onSubmit: (values?: FormValues) => void;
}

export const Form: React.FC<FormProps> = ({ children, name: nameProp, onSubmit }) => {
	const name = React.useRef(nameProp || `form_${new Date().getTime().toString()}`);
	const logger = useLogger();
	const formContextValue = React.useMemo(() => ({ name: name.current }), []);
	const { getValues } = useForm({ name: name.current });

	const handleOnSubmit = React.useCallback(() => {
		const values = getValues();

		logger('Form > handleOnSubmit', { values });

		onSubmit(values);
	}, [getValues, logger, onSubmit]);

	useEventHubSubscriber<UseFormEventHubPayloadData>({
		name: getUseFormEventHubKey(name.current),
		callback: ({ payload }) => {
			if (payload.status === 'submitted') {
				handleOnSubmit();
			}
		},
		options: {
			refresh: false,
		},
	});

	logger('Form > render', { name: name.current });

	return (
		<formContext.Provider value={formContextValue}>
			<form name={name.current} onSubmit={handleOnSubmit}>
				{children}
			</form>
		</formContext.Provider>
	);
};
