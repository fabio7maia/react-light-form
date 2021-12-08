import React from 'react';
import { Form } from '../..';
import { useLogger } from '../../../hooks';
import { FormInputApi } from '../../../types';

export const FormInputLabelContainer: React.FC<FormInputApi> = React.memo(props => {
	const { label, name, render } = props;

	const logger = useLogger();

	logger('FormInputLabelContainer > render', {
		props,
		config: Form.getConfig(),
	});

	if (render?.labelContainer) {
		return <>{render.labelContainer(props)}</>;
	}

	const containerConfig = Form.getConfig()?.input?.labelContainer;
	if (containerConfig) {
		return <>{containerConfig(props)}</>;
	}

	return (
		<div style={{ display: 'flex', margin: '5px 0' }}>
			<label htmlFor={name}>{label}</label>
		</div>
	);
});
