import React from 'react';
import { Form } from '../..';
import { useLogger } from '../../../hooks';
import { FormInputChildrenProps } from '../formInput.component';

export const FormInputErrorContainer: React.FC<FormInputChildrenProps> = React.memo(props => {
	const { render, error, variant } = props;

	const logger = useLogger();

	logger('FormInputErrorContainer > render', {
		props,
		config: Form.getConfigInput({ type: 'errorContainer', variant }),
	});

	if (render?.errorContainer) {
		return <>{render.errorContainer(props)}</>;
	}

	const containerConfig = Form.getConfigInput({ type: 'errorContainer', variant });
	if (containerConfig) {
		return <>{containerConfig(props)}</>;
	}

	return error ? <div style={{ display: 'flex', color: 'red', padding: '4px 0' }}>{error}</div> : null;
});
