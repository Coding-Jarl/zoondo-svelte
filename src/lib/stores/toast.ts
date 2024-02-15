import { writable } from 'svelte/store';

export const currentToasts = writable<Array<Toast.Item>>([]);

export const addToast = ({ msg, type }: Toast.Options): void => {
	const id = crypto.randomUUID();
	currentToasts.update((old) => [...old, { msg, type, id }]);
	setTimeout(() => deleteToast(id), 3000);
};

export const deleteToast = (id: string): void => {
	currentToasts.update((old) => old.filter((toast) => toast.id !== id));
};
