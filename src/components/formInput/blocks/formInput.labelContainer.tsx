import React from 'react';
import { Form } from '../..';
import { useLogger } from '../../../hooks';
import { FormInputChildrenProps } from '../formInput.component';

export const FormInputLabelContainer: React.FC<FormInputChildrenProps> = React.memo(props => {
	const { label, name, render, variant } = props;

	const logger = useLogger();

	logger('FormInputLabelContainer > render', {
		props,
		config: Form.getConfig({ type: 'labelContainer', variant }),
	});

	if (render?.labelContainer) {
		return <>{render.labelContainer(props)}</>;
	}

	const containerConfig = Form.getConfig({ type: 'labelContainer', variant });
	if (containerConfig) {
		return <>{containerConfig(props)}</>;
	}

	return (
		<div style={{ display: 'flex', margin: '5px 0' }}>
			<label htmlFor={name}>{label}</label>
		</div>
	);
});
