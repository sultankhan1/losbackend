import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { templateData } from "./staticData/template";

export async function main() {

  // await prisma.template.createMany({
  //   data: templateData as any,
  //   skipDuplicates: true,
  // });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
