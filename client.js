const {PrismaClient} = require("@prisma/client");

let prismaInstance = null;

module.exports = function getPrismaClient() {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }

  return prismaInstance;
}
