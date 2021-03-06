import React from 'react';
import { Form } from '../components';
import { StorybookHelper } from '../storybook';
import { BasicForm } from './basicForm';
import { BasicFormMixedVariant } from './basicFormMixedVariant';
import { BasicFormSimpleVariant } from './basicFormSimpleVariant';
import { BasicFormWithFormValidations } from './basicFormWithFormValidations';

const story = StorybookHelper.writeStory({ component: Form, group: 'Modules' });

export default story.meta;

Form.configure({
	input: {
		default: {
			container: ({ errorContainerRender, inputContainerRender, labelContainerRender }): React.ReactNode => (
				<div>
					<div
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							border: '2px solid gray',
							borderRadius: '8px',
							padding: '4px',
						}}
					>
						{labelContainerRender()}
						{inputContainerRender()}
					</div>
					{errorContainerRender()}
				</div>
			),
			inputContainer: (props): React.ReactNode => (
				<input
					{...props}
					style={{
						border: '0',
						width: 'calc(100% - 8px)',
						height: '24px',
					}}
				/>
			),
			labelContainer: ({ label, name }): React.ReactNode => (
				<div style={{ textAlign: 'left' }}>
					<label htmlFor={name} style={{ color: 'gray' }}>
						{label}
					</label>
				</div>
			),
		},
		simple: {
			container: ({ errorContainerRender, inputContainerRender, labelContainerRender }): React.ReactNode => (
				<div
					style={{
						border: '0',
						padding: '4px',
					}}
				>
					{labelContainerRender()}
					{inputContainerRender()}
					{errorContainerRender()}
				</div>
			),
			inputContainer: (props): React.ReactNode => (
				<input
					{...props}
					style={{
						border: '0',
						width: 'calc(100% - 8px)',
						height: '20px',
					}}
				/>
			),
			labelContainer: ({ label, name }): React.ReactNode => (
				<div style={{ textAlign: 'left' }}>
					<label htmlFor={name} style={{}}>
						{label}
					</label>
				</div>
			),
		},
	},
	validations: {
		fired: 'change',
	},
});

const template = (): JSX.Element => <BasicForm />;

export const Default = template.bind({});

Default.args = {};

const templateMixedVariant = (): JSX.Element => <BasicFormMixedVariant />;

export const MixedVariant = templateMixedVariant.bind({});

MixedVariant.args = {};

const templateSimpleVariant = (): JSX.Element => <BasicFormSimpleVariant />;

export const SimpleVariant = templateSimpleVariant.bind({});

SimpleVariant.args = {};

const templateWithFormValidations = (): JSX.Element => <BasicFormWithFormValidations />;

export const WithFormValidations = templateWithFormValidations.bind({});

WithFormValidations.args = {};
