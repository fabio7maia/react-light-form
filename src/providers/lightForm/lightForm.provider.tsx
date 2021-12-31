import React from 'react';
import { useLogger } from '../../hooks';
import { FormStore } from '../../store';
import {
	FormApi,
	FormApiGetErrorsMethodInput,
	FormApiGetValuesMethodInput,
	FormApiSetErrorsMethodInput,
	FormApiSetValuesMethodInput,
	FormApiSubmitMethodInput,
	FormMetatada,
} from '../../types';

const emptyFn = (): any => {
	console.log('empty');
};

const initialFormContext: FormApi = {
	getErrors: emptyFn,
	setErrors: emptyFn,
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

	const handleGetErrors = React.useCallback(
		({ name }: FormApiGetErrorsMethodInput) => {
			logger('LightFormProvider > handleGetErrors', { name });

			return FormStore.getErrors({ name });
		},
		[logger]
	);

	const handleSetErrors = React.useCallback(
		({ name, errors }: FormApiSetErrorsMethodInput) => {
			logger('LightFormProvider > handleSetErrors', { name, errors });

			FormStore.setErrors({ name, errors });

			setFormsInputsMetadata(oldValue => ({
				...oldValue,
				[name]: {
					changeObjects: Object.keys(errors),
					timestamp: new Date().getTime(),
					event: 'setErrors',
				},
			}));
		},
		[logger, setFormsInputsMetadata]
	);

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

			setFormsInputsMetadata(oldValue => ({
				...oldValue,
				[name]: {
					changeObjects: Object.keys(values),
					timestamp: new Date().getTime(),
					event: 'setValues',
				},
			}));
		},
		[logger, setFormsInputsMetadata]
	);

	const handleSubmit = React.useCallback(
		({ name }: FormApiSubmitMethodInput) => {
			logger('LightFormProvider > handleSubmit', { name });
			setFormsMetadata(oldValue => ({
				...oldValue,
				[name]: {
					changeObjects: [],
					timestamp: new Date().getTime(),
					event: 'submitted',
				},
			}));
		},
		[logger, setFormsMetadata]
	);

	const lightFormContextValue = React.useMemo(
		() => ({
			getErrors: handleGetErrors,
			setErrors: handleSetErrors,
			getValues: handleGetValues,
			setValues: handleSetValues,
			submit: handleSubmit,
		}),
		[handleGetErrors, handleGetValues, handleSetErrors, handleSetValues, handleSubmit]
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
