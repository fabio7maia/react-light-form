import React from 'react';
import { Form } from '../..';
import { useLogger } from '../../../hooks';
import { FormInputChildrenProps } from '../formInput.component';

export const FormInputInputContainer: React.FC<FormInputChildrenProps> = React.memo(props => {
	const { render, variant } = props;

	const logger = useLogger();

	logger('FormInputInputContainer > render', {
		props,
		config: Form.getConfigInput({ type: 'inputContainer', variant }),
	});

	if (render?.inputContainer) {
		return <>{render.inputContainer(props)}</>;
	}

	const containerConfig = Form.getConfigInput({ type: 'inputContainer', variant });
	if (containerConfig) {
		return <>{containerConfig(props)}</>;
	}

	return (
		<div style={{ display: 'flex', margin: '4px 0', width: '100%' }}>
			<input style={{ width: '100%' }} {...props} />
		</div>
	);
});
