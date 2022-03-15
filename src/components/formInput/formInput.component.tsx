import React from 'react';
import { useLogger, useFormInput } from '../../hooks';
import { FormInputContainer } from './blocks';
import { FormInputApi, FormInputApiChildren } from '../../types';

export type FormInputProps = FormInputApi;
export type FormInputChildrenProps = FormInputApiChildren;

export const FormInput: React.FC<FormInputProps> = props => {
	const newProps = useFormInput(props);
	const logger = useLogger();

	logger('FormInput > render', { newProps });

	return <FormInputContainer {...newProps} />;
};
