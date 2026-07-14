import { PrismaClient } from './src/generated/prisma/client.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';

const connection = new Database('./dev.db');
const adapter = new PrismaBetterSqlite3(connection);

const prisma = new PrismaClient({ 
  adapter, 
  datasourceUrl: "file:./dev.db" 
});

async function test() {
  console.log(await prisma.user.count());
}

test().catch(console.error);
