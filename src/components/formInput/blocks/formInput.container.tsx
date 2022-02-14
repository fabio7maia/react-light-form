import React from 'react';
import { Form } from '../..';
import { useLogger } from '../../../hooks';
import { FormInputChildrenProps } from '../formInput.component';
import { FormInputErrorContainer, FormInputInputContainer, FormInputLabelContainer } from '.';

export const FormInputContainer: React.FC<FormInputChildrenProps> = props => {
	const { render, variant } = props;

	const logger = useLogger();

	logger('FormInputContainer > render', {
		props,
		config: Form.getConfigInput({ type: 'container', variant }),
	});

	const labelContainerRender = (): React.ReactNode => <FormInputLabelContainer {...props} />;
	const inputContainerRender = (): React.ReactNode => <FormInputInputContainer {...props} />;
	const errorContainerRender = (): React.ReactNode => <FormInputErrorContainer {...props} />;

	const passedProps = {
		...props,
		labelContainerRender,
		inputContainerRender,
		errorContainerRender,
	};

	if (render?.container) {
		return <>{render.container(passedProps)}</>;
	}

	const containerConfig = Form.getConfigInput({ type: 'container', variant });
	if (containerConfig) {
		return <>{containerConfig(passedProps)}</>;
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{labelContainerRender()}
			{inputContainerRender()}
			{errorContainerRender()}
		</div>
	);
};
