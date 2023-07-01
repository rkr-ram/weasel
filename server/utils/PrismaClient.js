import { PrismaClient } from "@prisma/client";

let prismaInstance = null;

const getPerismaInstance = () => {
  if (!prismaInstance) {
    return (prismaInstance = new PrismaClient());
  }
  return prismaInstance;
};

export default getPerismaInstance;
