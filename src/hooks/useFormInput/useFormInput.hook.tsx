import React from 'react';
import { Form } from '../../components';
import { formContext } from '../../components/form';
import { FormInputApi } from '../../types';
import {
	getUseFormEventHubKey,
	useEventHubSubscriber,
	useForceUpdate,
	UseFormEventHubPayloadData,
	useLogger,
} from '..';
import { FormStore } from '../../helpers';

export const useFormInput = (props: FormInputApi) => {
	const { name, onBlur, onChange, onFocus, defaultValue, validations } = props;
	const { name: formName } = React.useContext(formContext);
	const logger = useLogger();
	const forceUpdate = useForceUpdate();

	const handleValidate = React.useCallback(() => {
		const value = FormStore.getValues({ name: formName })[name];
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

		FormStore.setErrors({
			name: formName,
			errors: {
				[name]: error,
			},
		});
	}, [formName, logger, name, validations]);

	React.useEffect(() => {
		const value = defaultValue || '';
		FormStore.setValues({ name: formName, values: { [name]: value } });
		FormStore.setErrors({ name: formName, errors: {} });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formName, name]);

	useEventHubSubscriber<UseFormEventHubPayloadData>({
		callback: ({ payload }) => {
			logger('useFormInput > useEventHubSubscriber', {
				...props,
				payload,
			});

			if (payload.status === 'setErrors' && Object.keys(payload.errors).includes(name)) {
				logger('useFormInput > useEventHubSubscriber > forceUpdate', {
					...props,
					payload,
				});

				forceUpdate();
			} else if (
				(payload.status === 'setValues' && Object.keys(payload.values).includes(name)) ||
				payload.status === 'submitted'
			) {
				handleValidate();

				forceUpdate();
			}
		},
		key: getUseFormEventHubKey(formName),
		options: {
			refresh: false,
		},
	});

	const handleOnBlur = React.useCallback(() => {
		const configValidations = Form.getConfigValidations();

		if ((configValidations?.fired || 'blur') === 'blur') {
			handleValidate();
			forceUpdate();
		}

		onBlur?.();
	}, [forceUpdate, handleValidate, onBlur]);

	const handleOnChange = React.useCallback(
		evt => {
			const configValidations = Form.getConfigValidations();
			const { value } = evt.currentTarget;

			logger('useFormInput > handleOnChange', {
				value,
			});

			FormStore.setValues({ name: formName, values: { [name]: value } });

			if ((configValidations?.fired || 'blur') === 'change') {
				handleValidate();
			} else {
				FormStore.setErrors({ name: formName, errors: { [name]: undefined } });
			}

			forceUpdate();

			onChange?.(value);
		},
		[forceUpdate, formName, handleValidate, logger, name, onChange]
	);

	const handleOnFocus = React.useCallback(() => {
		onFocus?.();
	}, [onFocus]);

	const error = FormStore.getErrors({ name: formName })[name];
	const value = FormStore.getValues({ name: formName })[name];

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
