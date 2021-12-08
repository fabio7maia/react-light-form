import React from 'react';
import { useLogger, useFormInput } from '../../hooks';
import {
	FormInputContainer,
	FormInputErrorContainer,
	FormInputInputContainer,
	FormInputLabelContainer,
} from './blocks';
import { FormInputApi } from '../../types';

export type FormInputProps = FormInputApi;

export const FormInput: React.FC<FormInputProps> = props => {
	const newProps = useFormInput(props);
	const logger = useLogger();

	logger('FormInput > render', { newProps });

	return (
		<>
			<FormInputContainer {...newProps}>
				<FormInputLabelContainer {...newProps} />
				<FormInputInputContainer {...newProps} />
			</FormInputContainer>
			<FormInputErrorContainer {...newProps} />
		</>
	);
};
