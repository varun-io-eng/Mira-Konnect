/**
 * Database initialization — runs on app startup to ensure essential data exists.
 * This seeds only the minimal required data (roles) for the app to function.
 * Demo data (sample jobs, users, blog posts) is handled by prisma/seed.ts manually.
 */
import { PrismaClient, RoleName } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Seed system roles if they don't exist.
 * This is essential for user registration to work.
 */
async function seedRoles() {
  console.log("Checking system roles...");

  const existingRoles = await prisma.role.findMany();
  const existingRoleNames = new Set(existingRoles.map((r) => r.name));

  const rolesToCreate = Object.values(RoleName).filter(
    (name) => !existingRoleNames.has(name),
  );

  if (rolesToCreate.length === 0) {
    console.log("All system roles already exist.");
    return;
  }

  console.log(`Creating ${rolesToCreate.length} missing system roles...`);

  await Promise.all(
    rolesToCreate.map((name) =>
      prisma.role.create({
        data: { name, description: `${name} role` },
      }),
    ),
  );

  console.log("System roles seeded successfully.");
}

/**
 * Initialize database with essential data.
 * Call this on app startup (e.g., in a layout or middleware).
 */
export async function initializeDatabase() {
  try {
    await seedRoles();
  } catch (error) {
    console.error("Database initialization failed:", error);
    // Don't throw - allow app to start even if init fails
    // The error will be visible in logs for debugging
  } finally {
    await prisma.$disconnect();
  }
}

// Allow running this script directly for manual initialization
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log("Database initialization complete.");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Database initialization failed:", error);
      process.exit(1);
    });
}
