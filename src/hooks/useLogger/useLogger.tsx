export const logger = (msg: string, rest?: any): void => {
	if (false) {
		console.log(msg, rest);
	}
};

export const useLogger = () => logger;
