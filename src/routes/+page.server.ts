export async function load({ fetch }) {
	const [board, messages] = await Promise.all([
		fetch('/api/boards').then<Game.Board>((r) => r.json()),
		fetch('/api/chat').then<Chat.Message[]>((r) => r.json())
	]);

	return {
		board,
		messages
	};
}
