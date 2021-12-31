import React from 'react';
import { formContext } from '../../components/form';
import { formsInputsMetadataContext, formsMetadataContext, lightFormContext } from '../../providers';
import { FormInputApi } from '../../types';
import { useLogger } from '..';

export const useFormInput = (props: FormInputApi) => {
	const { name, onBlur, onChange, onFocus, defaultValue, validations } = props;
	const { getValues, setValues, getErrors, setErrors } = React.useContext(lightFormContext);
	const { name: formName } = React.useContext(formContext);
	const formsMetadata = React.useContext(formsMetadataContext);
	const formsInputsMetadata = React.useContext(formsInputsMetadataContext);
	const logger = useLogger();

	const formMetadata = (formsMetadata || {})[formName];
	const errors = getErrors({ name: formName });
	const error = errors && errors[name] ? errors[name] : undefined;
	const values = getValues({ name: formName });
	const value = values && values[name] ? values[name] : defaultValue || '';

	const handleValidate = React.useCallback(
		value => {
			logger('useFormInput > handleValidate', {
				value,
			});

			let error = undefined;
			for (const validation of validations || []) {
				const res = validation(value);
				if (res) {
					error = res.message;
					break;
				}
			}

			setErrors({
				name: formName,
				errors: {
					name: error,
				},
			});
		},
		[formName, logger, setErrors, validations]
	);

	// React.useEffect(() => {
	// 	if (formMetadata?.event === 'submitted') {
	// 		handleValidate(value);
	// 	}
	// }, [formMetadata, handleValidate, value]);

	const handleOnBlur = React.useCallback(() => {
		handleValidate(value);

		onBlur?.();
	}, [handleValidate, onBlur, value]);

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

	logger('useFormInput > return', {
		...props,
		error,
		value,
	});

	return React.useMemo(
		() => ({
			...props,
			error,
			value,
			onBlur: handleOnBlur,
			onChange: handleOnChange,
			onFocus: handleOnFocus,
		}),
		[error, handleOnBlur, handleOnChange, handleOnFocus, props, value]
	);
};
