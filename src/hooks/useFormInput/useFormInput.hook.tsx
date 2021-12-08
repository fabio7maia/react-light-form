import React from 'react';
import { formContext } from '../../components/form';
import { formsInputsMetadataContext, lightFormContext } from '../../providers';
import { FormInputApi } from '../../types';
import { useLogger } from '..';

export const useFormInput = (props: FormInputApi) => {
	const { name, onBlur, onChange, onFocus, value, defaultValue } = props;
	const { getValues, setValues } = React.useContext(lightFormContext);
	const { name: formName } = React.useContext(formContext);
	const formsInputsMetadata = React.useContext(formsInputsMetadataContext);
	const logger = useLogger();

	const getValue = React.useCallback(() => {
		if (value || onChange) {
			return value;
		}

		const values = getValues({ name: formName });
		if (values && values[name]) {
			return values[name];
		}

		return defaultValue || '';
	}, [defaultValue, formName, getValues, name, onChange, value]);

	const handleOnBlur = React.useCallback(() => {
		onBlur?.();
	}, [onBlur]);

	const handleOnChange = React.useCallback(
		evt => {
			const { value } = evt.currentTarget;

			logger('useFormInput > handleOnChange', {
				value,
			});

			setValues({ name: formName, values: { [name]: value } });

			onChange?.(value);
		},
		[formName, logger, name, onChange, setValues]
	);

	const handleOnFocus = React.useCallback(() => {
		onFocus?.();
	}, [onFocus]);

	logger('useFormInput > return', { ...props });

	return {
		...props,
		value: getValue(),
		onBlur: handleOnBlur,
		onChange: handleOnChange,
		onFocus: handleOnFocus,
	};
};
