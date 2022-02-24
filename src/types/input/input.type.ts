import React from 'react';

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

export type FormValidationOutput = undefined | { message: string; value?: string };

export type FormValidationItem = (value?: any) => FormValidationOutput;

type HtmlInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export interface FormInputApi
	extends Pick<
		HtmlInputProps,
		| 'autoComplete'
		| 'defaultValue'
		| 'disabled'
		| 'inputMode'
		| 'max'
		| 'maxLength'
		| 'min'
		| 'minLength'
		| 'name'
		| 'placeholder'
		| 'readOnly'
		| 'required'
		| 'type'
	> {
	label?: React.ReactNode;
	validations?: FormValidationItem[];
	render?: FormInputRender;
	variant?: string;
	onBlur?: () => void;
	onChange?: (value?: any) => void;
	onFocus?: () => void;
}
