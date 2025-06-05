import { prisma } from '../src/lib/prisma';

async function main(): Promise<void> {
  // Add seed data if needed
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 