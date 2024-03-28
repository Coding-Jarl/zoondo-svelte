import { PrismaClient } from '@prisma/client';

class DBClient {
  private static _instance: PrismaClient;

  public static getInstance() {
    if (!DBClient._instance) DBClient._instance = new PrismaClient();
    return DBClient._instance;
  }
}
export const dbClient = DBClient.getInstance();
