import {prisma} from '../src/lib/prisma'



async function main() {
  // Create an initial Admin user
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      id: "admin-user-001",
      email: "admin@example.com",
      name: "Super Admin",
      role: "admin", // Explicitly setting the role here
      emailVerified: true,
    },
  });

  console.log("Seed complete: Created Admin User", adminUser.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });