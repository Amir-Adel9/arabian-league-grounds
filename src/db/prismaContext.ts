import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export type PrismaContext = {
  prisma: PrismaClient;
};

export const createContext = (): PrismaContext => {
  return { prisma };
};
