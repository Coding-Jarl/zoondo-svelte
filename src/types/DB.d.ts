import { Prisma } from '@prisma/client';

declare global {
  namespace DB {
    type User = Prisma.UserGetPayload<object>;
    type Game = Prisma.GameGetPayload<object>;
    type Action = Prisma.ActionGetPayload<object>;

    type Message = Prisma.MessageGetPayload<object>;
    type MessageCreate = Prisma.MessageUncheckedCreateInput;
    // type MessageUpdate = ?

    type ActionCreate = Prisma.ActionUncheckedCreateInput;

    type CardInstanceCreate = Prisma.CardInstanceUncheckedCreateInput;

    type GameExtended = Prisma.GameGetPayload<{
      include: {
        actions: true;
        cards: true;
        player1: true;
        player2: true;
      };
    }>;

    type GameWithActions = Prisma.GameGetPayload<{
      include: {
        actions: true;
        cards: true;
      };
    }>;
  }
}
export {};
