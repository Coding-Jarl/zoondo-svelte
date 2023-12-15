declare global {
	namespace Chat {
		type Message = {
			id: number;
			userId: number;
			content: string;
			time: number
		};
	}
}

export {};
