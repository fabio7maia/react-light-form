import React from 'react';
import { Form } from '../..';
import { useLogger } from '../../../hooks';
import { FormInputApi } from '../../../types';

export const FormInputContainer: React.FC<FormInputApi> = props => {
	const { render, children } = props;

	const logger = useLogger();

	logger('FormInputContainer > render', {
		props,
		config: Form.getConfig(),
	});

	if (render?.container) {
		return <>{render.container(props)}</>;
	}

	const containerConfig = Form.getConfig()?.input?.container;
	if (containerConfig) {
		return <>{containerConfig(props)}</>;
	}

	return <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>;
};
