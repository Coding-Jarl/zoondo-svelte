import { dbClient } from '../../server/prisma';

export function createIfNotExists(data: DB.UserCreate) {
  return dbClient.user.upsert({
    where: { username: data.email },
    create: data,
    update: data
  });
}

export function getByName(username: string) {
  return dbClient.user.findFirst({
    where: { username }
  });
}

export function getAll() {
  return dbClient.user.findMany();
}
