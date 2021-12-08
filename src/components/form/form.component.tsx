import React from 'react';
import { useLogger } from '../../hooks';
import { formsMetadataContext, lightFormContext } from '../../providers';
import { FormValues } from '../../types';

export const formContext = React.createContext({
	name: '',
});

export interface FormProps {
	name?: string;
	onSubmit: (values?: FormValues) => void;
}

export const Form: React.FC<FormProps> = ({ children, name: nameProp, onSubmit }) => {
	const { getValues } = React.useContext(lightFormContext);
	const formsMetadata = React.useContext(formsMetadataContext);
	const name = React.useRef(nameProp || `form_${new Date().getTime().toString()}`);
	const currentFormMetadata = formsMetadata[name.current];
	const lastEvent = React.useRef(currentFormMetadata);
	const logger = useLogger();
	const formContextValue = React.useMemo(() => ({ name: name.current }), []);

	const handleOnSubmit = React.useCallback(() => {
		const values = getValues({ name: name.current });

		logger('Form > handleOnSubmit', { values });

		onSubmit(values);
	}, [getValues, logger, onSubmit]);

	React.useEffect(() => {
		logger('Form > useEffect', {
			lastEvent: lastEvent.current,
			currentFormMetadata,
		});
		if (
			currentFormMetadata?.event === 'submitted' &&
			(!lastEvent.current || lastEvent.current?.timestamp < currentFormMetadata?.timestamp)
		) {
			handleOnSubmit();
		}
	}, [currentFormMetadata, handleOnSubmit, logger]);

	logger('Form > render', { currentFormMetadata, name: name.current });

	return (
		<formContext.Provider value={formContextValue}>
			<form name={name.current} onSubmit={handleOnSubmit}>
				{children}
			</form>
		</formContext.Provider>
	);
};
