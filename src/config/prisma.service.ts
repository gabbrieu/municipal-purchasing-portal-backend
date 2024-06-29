import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'beforeExit'>
    implements OnModuleInit
{
    // constructor() {
    //     super({
    //         log: [
    //             {
    //                 emit: 'event',
    //                 level: 'query',
    //             },
    //         ],
    //     });
    // }

    async onModuleInit(): Promise<void> {
        // this.$on('query', (event: Prisma.QueryEvent) => {
        //     console.log('Query: ' + event.query + '\nParams: ' + event.params);
        //     console.log('Duration: ' + event.duration + 'ms');
        // });

        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
