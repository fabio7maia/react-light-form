import React from 'react';
import { Form } from '../components';
import { FormInputApi } from '../types';

type InputSimpleProps = FormInputApi;

export const InputSimple: React.FC<InputSimpleProps> = props => {
	return (
		<Form.Input
			{...props}
			render={{
				container: ({ errorContainerRender, inputContainerRender, labelContainerRender }) => (
					<div>
						<div
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								border: '2px solid gray',
								borderRadius: '8px',
								padding: '4px',
							}}
						>
							{labelContainerRender()}
							{inputContainerRender()}
						</div>
						{errorContainerRender()}
					</div>
				),
				inputContainer: props => <input {...props} type="checkbox" />,
				labelContainer: ({ name, label }) => <span className="label-text">{label}</span>,
				errorContainer: ({ error }) => <label style={{ border: 'red 1px solid' }}>error text</label>,
			}}
		/>
	);
};
