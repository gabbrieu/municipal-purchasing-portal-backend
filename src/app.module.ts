import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { GovModule } from './modules/gov/gov.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `${process.env.NODE_ENV}.env`,
        }),
        AuthModule,
        UserModule,
        GovModule,
        ContactsModule,
    ],
})
export class AppModule {}
