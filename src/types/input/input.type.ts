import React, { HTMLInputTypeAttribute } from 'react';

interface BaseFormInputApi {
	name: string;
	error?: React.ReactNode;
	label?: React.ReactNode;
	defaultValue?: any;
	value?: any;
	validations?: any[];
	onBlur?: () => void;
	onChange?: (value?: any) => void;
	onFocus?: () => void;
}

export interface FormInputRender {
	container?: (props: BaseFormInputApi) => React.ReactNode;
	labelContainer?: (props: BaseFormInputApi) => React.ReactNode;
	inputContainer?: (props: BaseFormInputApi) => React.ReactNode;
	errorContainer?: (props: BaseFormInputApi) => React.ReactNode;
}

export interface FormInputApi {
	name: string;
	type?: HTMLInputTypeAttribute;
	label?: React.ReactNode;
	defaultValue?: any;
	validations?: any[];
	render?: FormInputRender;
	onBlur?: () => void;
	onChange?: (value?: any) => void;
	onFocus?: () => void;
}
