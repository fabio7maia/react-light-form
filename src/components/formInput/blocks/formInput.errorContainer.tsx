import React from 'react';
import { Form } from '../..';
import { useLogger } from '../../../hooks';
import { FormInputApi } from '../../../types';

export const FormInputErrorContainer: React.FC<FormInputApi> = React.memo(props => {
	const { render, error } = props;

	const logger = useLogger();

	logger('FormInputErrorContainer > render', {
		props,
		config: Form.getConfig(),
	});

	if (render?.errorContainer) {
		return <>{render.errorContainer(props)}</>;
	}

	const containerConfig = Form.getConfig()?.input?.errorContainer;
	if (containerConfig) {
		return <>{containerConfig(props)}</>;
	}

	return error ? <div style={{ display: 'flex', color: 'red', padding: '5px 0' }}>{error}</div> : null;
});
