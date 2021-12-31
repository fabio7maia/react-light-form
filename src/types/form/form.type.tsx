// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dictionary = Record<string, any>;
export type FormValues = Dictionary;

export interface FormApiBaseMethodInput {
	name: string;
}

export type FormApiGetErrorsMethodInput = FormApiBaseMethodInput;

export interface FormApiSetErrorsMethodInput extends FormApiBaseMethodInput {
	errors: Dictionary;
}

export type FormApiGetValuesMethodInput = FormApiBaseMethodInput;

export interface FormApiSetValuesMethodInput extends FormApiBaseMethodInput {
	values: FormValues;
}

export type FormApiSubmitMethodInput = FormApiBaseMethodInput;

export interface FormStatus {
	event: 'setErrors' | 'setValues' | 'submitted';
	timestamp: number;
	changeObjects: string[];
}

export type FormMetatada = Record<string, FormStatus>;

export interface FormApi {
	getErrors: (input: FormApiGetErrorsMethodInput) => Dictionary | undefined;
	setErrors: (input: FormApiSetErrorsMethodInput) => void;
	getValues: (input: FormApiGetValuesMethodInput) => FormValues | undefined;
	setValues: (input: FormApiSetValuesMethodInput) => void;
	submit: (input: FormApiSubmitMethodInput) => void;
}
