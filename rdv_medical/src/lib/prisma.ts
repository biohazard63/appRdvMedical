
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient() || global.prisma;

if (process.env.NODE_ENV === 'development') {
    global.prisma = prisma;
}

export { prisma };