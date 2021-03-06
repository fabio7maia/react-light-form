import React from 'react';
import { Form as FormComponent } from './form';
import { FormInput } from './formInput';
import { FormInputApi } from '../types';

interface FormInputConfiguration {
	container?: (
		props: FormInputApi & {
			labelContainerRender: () => React.ReactNode;
			inputContainerRender: () => React.ReactNode;
			errorContainerRender: () => React.ReactNode;
		}
	) => React.ReactNode;
	labelContainer?: (props: FormInputApi) => React.ReactNode;
	inputContainer?: (props: FormInputApi) => React.ReactNode;
	errorContainer?: (props: FormInputApi) => React.ReactNode;
}

type FormInputConfigurationTypes = 'container' | 'labelContainer' | 'inputContainer' | 'errorContainer';

type FormConfigurationGetConfigMethodInput = {
	type: FormInputConfigurationTypes;
	variant?: string;
};

type FormConfigurationValidations = {
	/**
	 * Default validations has fired in 'blur'
	 */
	fired: 'change' | 'blur';
};

interface FormConfig {
	input?: FormInputConfiguration | (Record<string, FormInputConfiguration> & { default: FormInputConfiguration });
	validations?: FormConfigurationValidations;
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

	static getConfigInput = ({
		type,
		variant,
	}: FormConfigurationGetConfigMethodInput): ((props: FormInputApi) => React.ReactNode | undefined) => {
		const config = FormConfiguration._config;
		try {
			if (!config) {
				return;
			}

			if (typeof config.input['default'] === 'object') {
				if (variant && config.input[variant][type]) {
					return config.input[variant][type];
				}

				return config.input['default'][type];
			}

			return config.input[type] as (props: FormInputApi) => React.ReactNode | undefined;
		} catch (err) {
			return config.input[type] as (props: FormInputApi) => React.ReactNode | undefined;
		}
	};
	static getConfigValidations = (): FormConfigurationValidations | undefined => {
		return FormConfiguration._config.validations;
	};
}

export const Form = Object.assign(FormComponent, {
	Input: FormInput,
	configure: FormConfiguration.configure,
	getConfigInput: FormConfiguration.getConfigInput,
	getConfigValidations: FormConfiguration.getConfigValidations,
});
