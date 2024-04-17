declare global {
  namespace Game {
    type Corner = number | '*';

    type Move = [X: number, Y: number];

    type Card = {
      slug: string;
      name: string;
      image: string;
      type: Type;
      corners: [NW: Corner, NE: Corner, SE: Corner, SW: Corner];
      value: number;
      moves: Array<Array<Move>>;
      power?: string;
      resolver?: () => void;
    };
    type PlayerCard = {
      card: Card;
      owner: DB.User['id'];
      instanceid: string;
    };
    type OpponentCard = {
      card: null;
      owner: DB.User['id'];
      instanceid: string;
    };
    type NoCard = {
      card: null;
      owner: null;
    };
    type CardInstance = OpponentCard | PlayerCard | NoCard;

    type Position = {
      x: number;
      y: number;
    };

    type Square = Position & CardInstance;

    type Board = Array<Square>;

    type Transition = [Position, Position];
  }
}
export {};
