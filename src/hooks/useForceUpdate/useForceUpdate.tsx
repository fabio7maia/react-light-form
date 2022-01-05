import React from 'react';

export const useForceUpdate = (): (() => void) => {
	const [, setForceUpdate] = React.useState(0);

	return (): void => setForceUpdate(val => val + 1);
};
