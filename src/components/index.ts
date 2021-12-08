import React from 'react';
import { Form as FormComponent } from './form';
import { FormInput } from './formInput';
import { FormInputApi } from '../types';

interface FormInputConfiguration {
	container?: (props: FormInputApi & { children?: React.ReactNode }) => React.ReactNode;
	labelContainer?: (props: FormInputApi) => React.ReactNode;
	inputContainer?: (props: FormInputApi) => React.ReactNode;
	errorContainer?: (props: FormInputApi) => React.ReactNode;
}

interface FormConfig {
	input?: FormInputConfiguration;
}

class FormConfiguration {
	private static _instance: FormConfiguration;
	private static _config?: FormConfig;

	constructor() {
		if (!FormConfiguration._instance) {
			FormConfiguration._instance = this;
		}

		return FormConfiguration._instance;
	}

	static configure = (config: FormConfig): void => {
		FormConfiguration._config = config;
	};

	static getConfig = (): FormConfig | undefined => {
		return FormConfiguration._config;
	};
}

export const Form = Object.assign(FormComponent, {
	Input: FormInput,
	configure: FormConfiguration.configure,
	getConfig: FormConfiguration.getConfig,
});
