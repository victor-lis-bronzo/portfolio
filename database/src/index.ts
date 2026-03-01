import * as dotenv from "dotenv";
dotenv.config();

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schemas from "./schemas";

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://user:password@localhost:5432/portfolio";

const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema: schemas });