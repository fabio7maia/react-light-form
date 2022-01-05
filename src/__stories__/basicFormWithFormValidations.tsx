import React from 'react';
import { Form } from '../components';
import { useForm, useLogger } from '../hooks';

export const BasicFormWithFormValidations: React.FC = () => {
	const logger = useLogger();

	const handleOnSubmit = React.useCallback(
		values => {
			logger('BasicForm > handleOnSubmit', { values });
		},
		[logger]
	);

	const requiredValidation = React.useCallback((message: string) => value => (value ? undefined : { message }), []);

	const { getFormInputProps, getFormProps, setValues, submit } = useForm({
		validations: {
			name: [requiredValidation('Name is required!')],
			password: [requiredValidation('Password is required!')],
		},
	});

	React.useEffect(() => {
		setTimeout(() => {
			logger('BasicForm > useEffect > setValues', {
				name: 'John',
			});

			setValues({
				name: 'John',
			});
		}, 5000);
	}, [logger, setValues]);

	logger('BasicForm > render');

	return (
		<Form {...getFormProps()} onSubmit={handleOnSubmit}>
			<Form.Input {...getFormInputProps({ name: 'name' })} label="Name" />
			<Form.Input {...getFormInputProps({ name: 'password' })} label="Password" type="password" />
			<button type="button" style={{ margin: '50px 0 0 0' }} onClick={submit}>
				Save
			</button>
		</Form>
	);
};
