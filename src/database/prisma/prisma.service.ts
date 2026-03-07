import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {

    private readonly pool: Pool;

    constructor() {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL environment variable is not set');
        }

        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
        });

        const adapter = new PrismaPg(pool);

        super({
            adapter,
            log: ['query', 'info', 'warn', 'error'],
        });

        this.pool = pool;
    }

    async onModuleInit() {
        await this.$connect();
        console.log('Connected to database');
        const db = await this.$queryRawUnsafe(
            `SELECT current_database(), current_schema()`
        );
        console.log("CWD:", process.cwd());
        console.log("DATABASE_URL:", process.env.DATABASE_URL);
        console.log("CONNECTED TO:", db);
    }

    async onModuleDestroy() {
        await this.$disconnect();
        await this.pool.end(); 
        console.log('Disconnected from database');
    }
}

// import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect();
//   }

//   async enableShutdownHooks(app: INestApplication) {
//     this.$on('beforeExit', async () => {
//       await app.close();
//     });
//   }
// }