import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle() {
  const user = await prisma.user.create({
    data: { username: "jadson", email: "#", password: "#" },
  });
  console.log(user);
}

handle();
