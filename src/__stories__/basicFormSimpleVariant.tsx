import React from 'react';
import { Form } from '../components';
import { useForm, useLogger } from '../hooks';

export const BasicFormSimpleVariant: React.FC = () => {
	const logger = useLogger();

	const handleOnSubmit = React.useCallback(
		values => {
			logger('BasicFormSimpleVariant > handleOnSubmit', { values });
		},
		[logger]
	);

	const { getFormProps, setValues, submit } = useForm();

	React.useEffect(() => {
		setTimeout(() => {
			logger('BasicFormSimpleVariant > useEffect > setValues', {
				name: 'John',
			});

			setValues({
				name: 'John',
			});
		}, 5000);
	}, [logger, setValues]);

	logger('BasicFormSimpleVariant > render');

	return (
		<Form {...getFormProps()} onSubmit={handleOnSubmit}>
			<Form.Input
				name="name"
				label="Name"
				variant="simple"
				validations={[value => (value ? undefined : { message: 'Required' })]}
			/>
			<Form.Input
				name="email"
				label="Email"
				variant="simple"
				validations={[value => (value ? undefined : { message: 'Required' })]}
			/>
			<button type="button" style={{ margin: '50px 0 0 0' }} onClick={submit}>
				Save
			</button>
		</Form>
	);
};
