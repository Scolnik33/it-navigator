import { PrismaClient } from "@prisma/client";

const prismaClientSignleton = () => {
    return new PrismaClient();
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSignleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSignleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;