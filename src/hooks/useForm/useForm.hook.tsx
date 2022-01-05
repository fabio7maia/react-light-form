import React from 'react';
import { useEventHubEmitter, useLogger } from '..';
import { formContext } from '../../components/form';
import { FormStore } from '../../helpers';
import { Dictionary, FormStatus, FormValidationItem, FormValues } from '../../types';

interface UseFormInput {
	name?: string;
	validations?: Record<string, FormValidationItem[]>;
}

export const getUseFormEventHubKey = (name: string): string => `form_${name}`;
export type UseFormEventHubPayloadData = { status: FormStatus; errors?: Dictionary; values?: FormValues };

export const useForm = ({ name: nameProp, validations = {} }: UseFormInput = {}) => {
	const currentForm = React.useContext(formContext);
	const name = React.useRef(nameProp || currentForm.name || `form_${new Date().getTime()}`);
	const logger = useLogger();
	const { emit } = useEventHubEmitter<UseFormEventHubPayloadData>({ key: getUseFormEventHubKey(name.current) });

	const handleGetFormProps = React.useCallback(() => {
		logger('useForm > handleGetFormProps', { name: name.current });
		return { name: name.current };
	}, [logger]);

	const handleGetFormInputProps = React.useCallback(
		({ name }: { name: string }) => {
			logger('useForm > handleGetFormInputProps', { name });
			return { name, validations: validations[name] };
		},
		[logger, validations]
	);

	const handleGetErrors = React.useCallback(() => {
		const errors = FormStore.getErrors({ name: name.current });

		logger('useForm > handleGetErrors', {
			name: name.current,
			errors,
		});

		return errors;
	}, [logger]);

	const handleSetErrors = React.useCallback(
		(errors: Dictionary) => {
			logger('useForm > handleSetErrors', {
				name: name.current,
				errors,
			});

			FormStore.setErrors({ name: name.current, errors });

			emit({
				payload: {
					status: 'setErrors',
					errors,
				},
			});
		},
		[emit, logger]
	);

	const handleGetValues = React.useCallback(() => {
		const values = FormStore.getValues({ name: name.current });

		logger('useForm > handleGetValues', {
			name: name.current,
			values,
		});

		return values;
	}, [logger]);

	const handleSetValues = React.useCallback(
		(values: FormValues) => {
			logger('useForm > handleSetValues', {
				name: name.current,
				values,
			});

			FormStore.setValues({ name: name.current, values });

			emit({
				payload: {
					status: 'setValues',
					values,
				},
			});
		},
		[emit, logger]
	);

	const handleSubmit = React.useCallback(() => {
		logger('useForm > handleSubmit', {
			name: name.current,
		});

		FormStore.submit({ name: name.current });

		emit({
			payload: {
				status: 'submitted',
			},
		});
	}, [emit, logger]);

	logger('useForm > return', {
		name: name.current,
	});

	return React.useMemo(
		() => ({
			name: name.current,
			getFormProps: handleGetFormProps,
			getFormInputProps: handleGetFormInputProps,
			getErrors: handleGetErrors,
			setErrors: handleSetErrors,
			getValues: handleGetValues,
			setValues: handleSetValues,
			submit: handleSubmit,
		}),
		[
			handleGetErrors,
			handleGetFormInputProps,
			handleGetFormProps,
			handleGetValues,
			handleSetErrors,
			handleSetValues,
			handleSubmit,
		]
	);
};
