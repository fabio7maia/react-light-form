import React from 'react';
import { Form } from '../..';
import { useLogger } from '../../../hooks';
import { FormInputChildrenProps } from '../formInput.component';

export const FormInputContainer: React.FC<FormInputChildrenProps> = props => {
	const passedProps = { ...props };
	delete passedProps.onChange;

	const { render, children, variant } = props;

	const logger = useLogger();

	logger('FormInputContainer > render', {
		props,
		config: Form.getConfigInput({ type: 'container', variant }),
	});

	if (render?.container) {
		return <>{render.container(passedProps)}</>;
	}

	const containerConfig = Form.getConfigInput({ type: 'container', variant });
	if (containerConfig) {
		return <>{containerConfig(passedProps)}</>;
	}

	return <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>;
};
