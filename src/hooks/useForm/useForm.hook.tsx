import React from 'react';
import { useLogger } from '..';
import { formContext } from '../../components/form';
import { lightFormContext } from '../../providers';
import { FormValues } from '../../types';

interface UseFormInput {
	name?: string;
}

export const useForm = ({ name: nameProp }: UseFormInput = {}) => {
	const { getValues, setValues, submit } = React.useContext(lightFormContext);
	const currentForm = React.useContext(formContext);
	const name = React.useRef(nameProp || currentForm.name || `form_${new Date().getTime()}`);
	const logger = useLogger();

	const handleGetFormProps = React.useCallback(() => {
		logger('useForm > handleGetFormProps', { name: name.current });
		return { name: name.current };
	}, [logger]);

	const handleGetValues = React.useCallback(() => {
		logger('useForm > handleGetValues', {
			name: name.current,
			values: getValues({ name: name.current }),
		});
		return getValues({ name: name.current });
	}, [logger, getValues]);

	const handleSetValues = React.useCallback(
		(values: FormValues) => {
			logger('useForm > handleSetValues', {
				name: name.current,
				values,
			});
			setValues({ name: name.current, values });
		},
		[logger, setValues]
	);

	const handleSubmit = React.useCallback(() => {
		logger('useForm > handleSubmit', {
			name: name.current,
		});
		submit({ name: name.current });
	}, [logger, submit]);

	logger('useForm > return', {
		name: name.current,
	});

	return React.useMemo(
		() => ({
			name: name.current,
			getFormProps: handleGetFormProps,
			getValues: handleGetValues,
			setValues: handleSetValues,
			submit: handleSubmit,
		}),
		[handleGetFormProps, handleGetValues, handleSetValues, handleSubmit]
	);
};
