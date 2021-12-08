import React from 'react';
import { Form } from '../components';
import { useForm, useLogger } from '../hooks';
import { LightFormProvider } from '../providers';
import { StorybookHelper } from '../storybook';

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
			<Form.Input name="name" label="Name" error="Required" />
			<Form.Input name="email" label="Email" />
			<button type="button" style={{ margin: '50px 0 0 0' }} onClick={submit}>
				Save
			</button>
		</Form>
	);
};

const story = StorybookHelper.writeStory({ component: Form, group: 'Modules' });

export default story.meta;

const template = (): JSX.Element => (
	<LightFormProvider>
		<BasicForm />
	</LightFormProvider>
);

export const Default = template.bind({});

Default.args = {};
