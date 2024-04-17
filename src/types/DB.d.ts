import { Prisma } from '@prisma/client';

declare global {
  namespace DB {
    type IncludeKeys<T> = keyof Omit<T, '_count'>;

    type User = Prisma.UserGetPayload<object>;
    type UserCreate = Prisma.UserCreateInput;

    type Game = Prisma.GameGetPayload<object>;
    type GameInclude = Prisma.GameInclude;
    type GameIncludeKeys = keyof Prisma.GameInclude;
    /**
     * Retrieve a game with the specified relations included. The relations to include are specified as an array of strings,
     * each of which must be a valid key in the {@link GameInclude} interface.
     *
     * @template T The type of the include object. Must be an object where each key is a valid {@link GameIncludeKeys} and the value is `true`.
     * @param includes The relations to include in the query.
     * @returns A game, including the specified relations.
     */
    type GameExtendedByKeys<
      T extends GameIncludeKeys[],
      U = ArrayToObject<T, true>
    > = Prisma.GameGetPayload<{
      include: U;
    }>;
    type GameExtended<T extends GameInclude> = Prisma.GameGetPayload<{
      include: T;
    }>;

    type Action = Prisma.ActionGetPayload<object>;

    type Message = Prisma.MessageGetPayload<object>;
    type MessageCreate = Prisma.MessageUncheckedCreateInput;

    type ActionCreate = Prisma.ActionUncheckedCreateInput;

    type CardInstanceCreate = Prisma.CardInstanceUncheckedCreateInput;
    type CardInstanceIncludeKeys = keyof Prisma.CardInstanceInclude;
    type CardInstanceInclude = Prisma.CardInstanceInclude;
  }
}
export {};
