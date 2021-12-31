import React from 'react';
import { Form } from '../..';
import { useLogger } from '../../../hooks';
import { FormInputChildrenProps } from '../formInput.component';

export const FormInputInputContainer: React.FC<FormInputChildrenProps> = React.memo(props => {
	const { render } = props;

	const logger = useLogger();

	logger('FormInputInputContainer > render', {
		props,
		config: Form.getConfig(),
	});

	if (render?.inputContainer) {
		return <>{render.inputContainer(props)}</>;
	}

	const containerConfig = Form.getConfig()?.input?.inputContainer;
	if (containerConfig) {
		return <>{containerConfig(props)}</>;
	}

	return <input {...props} />;
});
