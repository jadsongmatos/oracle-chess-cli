import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle() {
  const user = await prisma.user.create({
    data: {
      id: "0",
      username: "jadson",
      email: "#",
      password: "#",
      birthday: new Date(),
    },
  });
  console.log(user);
}

handle();
