import { writable, get } from 'svelte/store';

type PlayerOne = 0;
type PlayerTwo = 1;
type GameStore = {
	gameId: DB.Game['game_id'] | null;
	players: Array<DB.User['id']>;
	playerTurn: PlayerOne | PlayerTwo;
	// board: Array<Game.Position>;
	focus: Game.Card | null;
	drag: Game.PlayerCard | null;
};

const gameStore = () => {
	const store = writable<GameStore>({
		gameId: null,
		players: [],
		playerTurn: 0,
		// board: [],
		focus: null,
		drag: null
	});

	return {
		...store,

		get drag(): Game.PlayerCard | null {
			return get(this).drag;
		},

		setGameId: (id: string) => {
			store.update((store) => {
				return {
					...store,
					gameId: id
				};
			});
		},

		setFocus: (card: Game.Card | null) => {
			store.update((store) => {
				return {
					...store,
					focus: card
				};
			});
		},

		setDrag: (card: Game.PlayerCard | null) => {
			store.update((store) => {
				return {
					...store,
					drag: card
				};
			});
		},

		toggleTurn: () => {
			store.update((store) => {
				return {
					...store,
					playerTurn: store.playerTurn === 0 ? 1 : 0
				};
			});
		}
	};
};

export const game = gameStore();
