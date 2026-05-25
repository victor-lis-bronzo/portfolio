// src/database/database.module.ts
import { Global, Module } from '@nestjs/common';
import { createDatabase } from '../../infra/database/connection';

// Exportamos essa string para não digitar errado nos outros arquivos
export const DRIZZLE = 'DRIZZLE_CONNECTION';

@Global() // O @Global faz com que você não precise importar esse módulo em todo lugar
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: () => {
        const connectionString =
          process.env.DATABASE_URL ||
          'postgresql://portfolio:portfolio123@localhost:5433/portfolio_db';

        return createDatabase(connectionString);
      },
    },
  ],
  exports: [DRIZZLE], // Permite que outros módulos usem essa conexão
})
export class DatabaseModule {}
