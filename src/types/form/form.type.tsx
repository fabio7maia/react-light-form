export type FormValues = Record<string, any>;

export interface FormApiGetValuesMethodInput {
  name: string;
}

export interface FormApiSetValuesMethodInput {
  name: string;
  values: FormValues;
}

export interface FormApiSubmitMethodInput {
  name: string;
}

export interface FormStatus {
  event: "setValues" | "submitted";
  timestamp: number;
  changeObjects: string[];
}

export type FormMetatada = Record<string, FormStatus>;

export interface FormApi {
  getValues: (input: FormApiGetValuesMethodInput) => FormValues | undefined;
  setValues: (input: FormApiSetValuesMethodInput) => void;
  submit: (input: FormApiSubmitMethodInput) => void;
}
