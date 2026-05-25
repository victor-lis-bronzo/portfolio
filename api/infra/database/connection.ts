import { drizzle } from 'drizzle-orm/node-postgres';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from './models/index';

export function createDatabase(connectionString: string): NodePgDatabase<any> {
  const pool = new pg.Pool({ connectionString });
  // O retorno de `drizzle` pode ter uma assinatura mais específica dependendo do schema;
  // fazemos um cast seguro para `NodePgDatabase<any>` para manter compatibilidade com as camadas
  return drizzle(pool, { schema }) as unknown as NodePgDatabase<any>;
}
