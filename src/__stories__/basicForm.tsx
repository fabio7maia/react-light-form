import React from 'react';
import { Form } from '../components';
import { useForm, useLogger } from '../hooks';

export const BasicForm: React.FC = () => {
	const logger = useLogger();

	const handleOnSubmit = React.useCallback(
		values => {
			logger('BasicForm > handleOnSubmit', { values });
		},
		[logger]
	);

	const { getFormProps, setValues, submit } = useForm();

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
			<Form.Input name="name" label="Name" validations={[() => ({ message: 'Required' })]} />
			<Form.Input name="email" label="Email" />
			<button type="button" style={{ margin: '50px 0 0 0' }} onClick={submit}>
				Save
			</button>
		</Form>
	);
};
