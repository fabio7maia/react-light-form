import { logger } from '../../hooks';
import { FormApi, FormApiGetValuesMethodInput, FormApiSetValuesMethodInput, FormValues } from '../../types';

const store: Record<string, FormValues> = {};

export const FormStore: Omit<FormApi, 'submit'> = {
	getValues: ({ name }: FormApiGetValuesMethodInput): FormValues | undefined => {
		logger('FormStore > getValues', { name, store });

		try {
			return store[name];
		} catch (err) {
			return undefined;
		}
	},
	setValues: ({ name, values }: FormApiSetValuesMethodInput) => {
		logger('FormStore > getValues', { name, values, store });

		try {
			store[name] = {
				...store[name],
				...values,
			};
		} catch (err) {}
	},
};
