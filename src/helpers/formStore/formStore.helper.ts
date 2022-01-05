import { logger } from '../../hooks';
import {
	Dictionary,
	FormApi,
	FormApiGetErrorsMethodInput,
	FormApiGetValuesMethodInput,
	FormApiSetErrorsMethodInput,
	FormApiSetValuesMethodInput,
	FormApiSubmitMethodInput,
	FormStatus,
	FormValues,
} from '../../types';

const store: Record<
	string,
	{
		errors: Dictionary;
		values: FormValues;
		status: FormStatus;
	}
> = {};

export const FormStore: FormApi = {
	getErrors: ({ name }: FormApiGetErrorsMethodInput): Dictionary => {
		logger('FormStore > getErrors', { name, store });

		try {
			return store[name]?.errors || {};
		} catch (err) {
			return {};
		}
	},
	setErrors: ({ name, errors }: FormApiSetErrorsMethodInput): void => {
		logger('FormStore > setErrors', { name, errors, store });

		try {
			store[name] = {
				...store[name],
				errors: {
					...store[name]?.errors,
					...errors,
				},
				status: 'setErrors',
			};
		} catch (err) {}
	},
	getValues: ({ name }: FormApiGetValuesMethodInput): FormValues => {
		logger('FormStore > getValues', { name, store });

		try {
			return store[name]?.values || {};
		} catch (err) {
			return {};
		}
	},
	setValues: ({ name, values }: FormApiSetValuesMethodInput): void => {
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
				status: 'setValues',
			};
		} catch (err) {}
	},
	submit: ({ name }: FormApiSubmitMethodInput): void => {
		logger('FormStore > submit', {
			name,
			store,
		});

		try {
			store[name] = {
				...store[name],
				status: 'submitted',
			};
		} catch (err) {}
	},
};
