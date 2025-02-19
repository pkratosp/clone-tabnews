import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const defaulMigrationOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const peddingMagrations = await migrationRunner(defaulMigrationOptions);

    return response.status(200).json(peddingMagrations);
  }

  if (request.method === "POST") {
    const migrateMigrations = await migrationRunner({
      ...defaulMigrationOptions,
      dryRun: false,
    });

    if (migrateMigrations.length > 0) {
      return response.status(201).json(migrateMigrations);
    }

    return response.status(200).json(migrateMigrations);
  }

  return response.status(405);
}
