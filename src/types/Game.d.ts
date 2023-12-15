declare global {
	namespace Game {
		type Corner = number | '*';

		type Move = [X: number, Y: number];

		type Card = {
			slug: string;
			name: string;
			type: Type;
			corners: [NW: Corner, NE: Corner, SE: Corner, SW: Corner];
			value: number;
			moves: Array<Array<Move>>;
			power?: string;
			resolver?: () => void;
		};

		type Position = {
			x: number;
			y: number;
		};

		type OpponentCard = {
			card: null;
			owner: number;
		};
		type PlayerCard = {
			card: Card;
			owner: number;
		};
		type NoCard = {
			card?: undefined;
		};
		type CardInstance = OpponentCard | PlayerCard;

		type SquareWithoutCard = Position & NoCard;
		type SquareWithCard = Position & CardInstance;

		type Square = SquareWithoutCard | SquareWithCard;

		type Board = Array<Square>;

		type Transition = [Position, Position];
	}
}
export {};
