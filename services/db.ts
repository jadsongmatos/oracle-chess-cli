import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

var client =
  globalThis.prisma ||
  new PrismaClient({
    log: [
      {
        emit: "stdout",
        level: "error",
      },
    ],
  });

client.$on("beforeExit", (e: any) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

async function connect() {
  client = globalThis.prisma || new PrismaClient();
  try {
    await client.$connect();
    if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
  } catch (err) {
    console.log("ERRO CONNECT", err);
    setTimeout(connect, 1000);
  }
}

connect();

export default client;