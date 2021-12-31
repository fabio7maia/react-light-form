export const logger = (msg: string, rest?: any): void => {
	if (true) {
		console.log(msg, rest);
	}
};

export const useLogger = () => logger;
