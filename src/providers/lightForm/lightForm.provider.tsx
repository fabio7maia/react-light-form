import React from 'react';
import { useLogger } from '../../hooks';
import { FormStore } from '../../store';
import {
	FormApi,
	FormApiGetValuesMethodInput,
	FormApiSetValuesMethodInput,
	FormApiSubmitMethodInput,
	FormMetatada,
} from '../../types';

const emptyFn = (): undefined => undefined;

const initialFormContext: FormApi = {
	getValues: emptyFn,
	setValues: emptyFn,
	submit: emptyFn,
};

export const lightFormContext = React.createContext(initialFormContext);

export const formsMetadataContext = React.createContext<FormMetatada>({});

export const formsInputsMetadataContext = React.createContext<FormMetatada>({});

export const LightFormProvider: React.FC = ({ children }) => {
	const [formsMetadata, setFormsMetadata] = React.useState<FormMetatada>({});
	const [formsInputsMetadata, setFormsInputsMetadata] = React.useState<FormMetatada>({});
	const logger = useLogger();

	const handleGetValues = React.useCallback(
		({ name }: FormApiGetValuesMethodInput) => {
			logger('LightFormProvider > handleGetValues', { name });

			return FormStore.getValues({ name });
		},
		[logger]
	);

	const handleSetValues = React.useCallback(
		({ name, values }: FormApiSetValuesMethodInput) => {
			logger('LightFormProvider > handleSetValues', { name, values });

			FormStore.setValues({ name, values });

			setFormsInputsMetadata({
				[name]: {
					changeObjects: Object.keys(values),
					timestamp: new Date().getTime(),
					event: 'setValues',
				},
			});
		},
		[logger, setFormsInputsMetadata]
	);

	const handleSubmit = React.useCallback(
		({ name }: FormApiSubmitMethodInput) => {
			logger('LightFormProvider > handleSubmit', { name });
			setFormsMetadata({
				[name]: {
					changeObjects: [],
					timestamp: new Date().getTime(),
					event: 'submitted',
				},
			});
		},
		[logger, setFormsMetadata]
	);

	const lightFormContextValue = React.useMemo(
		() => ({
			getValues: handleGetValues,
			setValues: handleSetValues,
			submit: handleSubmit,
		}),
		[handleGetValues, handleSetValues, handleSubmit]
	);

	logger('LightFormProvider > render');

	return (
		<lightFormContext.Provider value={lightFormContextValue}>
			<formsMetadataContext.Provider value={formsMetadata}>
				<formsInputsMetadataContext.Provider value={formsInputsMetadata}>
					{children}
				</formsInputsMetadataContext.Provider>
			</formsMetadataContext.Provider>
		</lightFormContext.Provider>
	);
};
