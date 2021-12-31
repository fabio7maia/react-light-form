import { logger } from '../../hooks';
import {
	Dictionary,
	FormApi,
	FormApiGetErrorsMethodInput,
	FormApiGetValuesMethodInput,
	FormApiSetErrorsMethodInput,
	FormApiSetValuesMethodInput,
	FormValues,
} from '../../types';

const store: Record<
	string,
	{
		errors: Dictionary;
		values: FormValues;
	}
> = {};

export const FormStore: Omit<FormApi, 'submit'> = {
	getErrors: ({ name }: FormApiGetErrorsMethodInput): Dictionary | undefined => {
		logger('FormStore > getErrors', { name, store });

		try {
			return store[name]?.errors;
		} catch (err) {
			return undefined;
		}
	},
	setErrors: ({ name, errors }: FormApiSetErrorsMethodInput) => {
		logger('FormStore > setErrors', { name, errors, store });

		try {
			store[name] = {
				...store[name],
				errors: {
					...store[name]?.errors,
					...errors,
				},
			};
		} catch (err) {}
	},
	getValues: ({ name }: FormApiGetValuesMethodInput): FormValues | undefined => {
		logger('FormStore > getValues', { name, store });

		try {
			return store[name]?.values;
		} catch (err) {
			return undefined;
		}
	},
	setValues: ({ name, values }: FormApiSetValuesMethodInput) => {
		logger('FormStore > setValues', {
			name,
			values,
			store,
		});

		try {
			store[name] = {
				...store[name],
				values: {
					...store[name]?.values,
					...values,
				},
			};
		} catch (err) {}
	},
};
