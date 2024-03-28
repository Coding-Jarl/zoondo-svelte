import crypto from 'crypto';
import { dbClient } from '../src/lib/server/prisma';
import db from '../src/lib/data/db';

const users = [
  {
    email: 'evoli@spamland.com',
    username: 'Evoli'
  },
  {
    email: 'aquali@spamland.com',
    username: 'Aquali'
  },
  {
    email: 'pyroli@spamland.com',
    username: 'Pyroli'
  }
];

async function main() {
  for (const user of users) {
    await db.users.createIfNotExists({
      id: crypto.randomUUID(), //SQLite
      ...user
    });
  }
}

main()
  .then(async () => {
    await dbClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await dbClient.$disconnect();
    process.exit(1);
  });
