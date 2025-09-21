import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

import { main as templateseed } from "./template.seed";

// Set the in-memory SQLite URL for tests
process.env.TEST_DATABASE_URL = 'file::memory:'; // Use SQLite in-memory database for testing
console.log(process.env.TEST_DATABASE_URL); // Logs the TEST_DATABASE_URL to verify it's set correctly

// Set the PostgreSQL URL for fetching schema and seed data
process.env.DATABASE_URL = 'postgresql://username:password@localhost:5432/mydatabase'; // Replace with your PostgreSQL connection string

// Create a new PrismaClient instance for testing
const prisma = new PrismaClient();

// Use a helper function to set up the in-memory database
async function setupDatabase() {
    execSync('npx prisma generate');

    // Fetch and run schema migration to create tables in SQLite
    // execSync('npx prisma migrate dev --name init --create-only'); // Create migration files
    execSync('npx prisma migrate'); // Mark migration as applied
    execSync('npx prisma db push'); // Push the schema to SQLite
  
    await fetchtemplateseed();
}

async function fetchtemplateseed() {
    // Fetch tags and templates from PostgreSQL and insert them into SQLite
    // const tags = await prisma.tags.findMany();
    // const template = await prisma.template.findMany();
  
    // // Insert the fetched data into the SQLite database
    // // await prisma.$executeRaw`INSERT INTO tags (name) VALUES ${tags.map(tag => `('${tag.name}')`).join(', ')}`;
    // await prisma.$executeRaw`INSERT INTO template (name, subject) VALUES ${template.map(template => `('${template.name}', '${template.subject}')`).join(', ')}`;
  }


// Initialize the database before tests
beforeAll(async () => {
    await setupDatabase();
});

// Clean up the database after tests
afterAll(async () => {
    await prisma.$disconnect();
});

// Export the prisma instance to use it in your tests
export default prisma;
