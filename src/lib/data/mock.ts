export const availableCards: Record<string, Game.Card> = {
	cloboulon: {
		slug: 'cloboulon',
		name: 'Cloboulon',
		type: 'chief',
		corners: [4, 5, '*', 2],
		power:
			'Le combat se solde par une égalité. Si tu viens de déplacer Cloboulon, tu déplaces un Grognard.',
		resolver: () => {
			console.log('ARBIIIIIIIIITRE !!!!!!!');
			console.log('Cloboulon says: Si tu viens de déplacer Cloboulon, tu déplaces un Grognard.');
			return 0;
		},
		value: 20,
		moves: [[[-1, 0]], [[-1, 1]], [[0, 1]], [[1, 1]], [[1, 0]], [[1, -1]], [[0, -1]], [[-1, -1]]]
	},
	'gold-hure': {
		slug: 'gold-hure',
		name: 'Gold-Hure',
		type: 'hero',
		corners: [4, 4, 2, '*'],
		power:
			'Le combat se solde par une égalité. Si tu viens de déplacer Gold-Hure, tu le déplaces à nouveau.',
		resolver: () => {
			console.log('ARBIIIIIIIIITRE !!!!!!!');
			console.log('Gold-Hure says: Si tu viens de déplacer Cloboulon, tu déplaces un Grognard.');

			return 0;
		},
		value: 24,
		moves: [
			[[-1, 0]],
			[
				[-1, 1],
				[-2, 2]
			],
			[
				[0, 1],
				[0, 2]
			],
			[
				[1, 1],
				[2, 2]
			],
			[[1, 0]],
			[[1, -1]],
			[
				[0, -1],
				[0, -2]
			],
			[[-1, -1]]
		]
	},
	bouclefeuille: {
		slug: 'bouclefeuille',
		name: 'Bouclefeuille',
		type: 'priest',
		corners: [2, 0, 0, '*'],
		resolver: () => {
			console.log('ARBIIIIIIIIITRE !!!!!!!');
			console.log(
				'Bouclefeuille says: Si tu viens de déplacer Cloboulon, tu déplaces un Grognard.'
			);

			return 0;
		},
		power:
			'Le combat se solde par une égalité. Tu déplaces Bouclefeuille dans une case libre du champ de bataille.',
		value: 2,
		moves: [[[-1, 0]], [[1, 0]]]
	},
	'grognard:0': {
		slug: 'grognard',
		name: 'Grognard',
		type: 'elite',
		corners: [3, 4, 2, 1],
		value: 16,
		moves: [
			[[-1, 0]],
			[
				[-1, 1],
				[-2, 2]
			],
			[[0, 1]],
			[
				[1, 1],
				[2, 2]
			],
			[[1, 0]]
		]
	},
	'grognard:1': {
		slug: 'grognard',
		name: 'Grognard',
		type: 'elite',
		corners: [4, 3, 1, 2],
		value: 16,
		moves: [
			[[-1, 0]],
			[
				[-1, 1],
				[-2, 2]
			],
			[[0, 1]],
			[
				[1, 1],
				[2, 2]
			],
			[[1, 0]]
		]
	},
	'kassin:0': {
		slug: 'kassin:0',
		name: 'Kassin',
		type: 'soldier',
		corners: [1, 2, 0, 0],
		value: 7,
		moves: [[[-1, 0]], [[0, 1]], [[1, 0]], [[0, -1]]]
	},
	'kassin:1': {
		slug: 'kassin:1',
		name: 'Kassin',
		type: 'soldier',
		corners: [2, 1, 0, 0],
		value: 7,
		moves: [[[-1, 0]], [[0, 1]], [[1, 0]], [[0, -1]]]
	},
	sacrechene: {
		slug: 'sacrechene',
		name: 'Sacrechêne',
		type: 'emblem',
		corners: [4, 2, 0, 0],
		value: 12,
		moves: []
	}
};

export const cardsOnBoard: Game.SquareWithCard[] = [
	{ card: { ...availableCards['cloboulon'] }, x: 0, y: 1, owner: 1 },
	{ card: { ...availableCards['gold-hure'] }, x: 1, y: 1, owner: 1 },
	{ card: { ...availableCards['bouclefeuille'] }, x: 2, y: 1, owner: 1 },
	{ card: { ...availableCards['sacrechene'] }, x: 3, y: 1, owner: 1 },
	{ card: { ...availableCards['grognard:0'] }, x: 4, y: 1, owner: 1 },
	{ card: { ...availableCards['grognard:1'] }, x: 5, y: 1, owner: 1 },
	{ card: { ...availableCards['cloboulon'] }, x: 0, y: 4, owner: 2 },
	{ card: { ...availableCards['cloboulon'] }, x: 1, y: 4, owner: 2 },
	{ card: { ...availableCards['cloboulon'] }, x: 2, y: 4, owner: 2 },
	{ card: { ...availableCards['cloboulon'] }, x: 3, y: 4, owner: 2 },
	{ card: { ...availableCards['cloboulon'] }, x: 4, y: 4, owner: 2 },
	{ card: { ...availableCards['cloboulon'] }, x: 5, y: 4, owner: 2 }
];
