import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envFilePathConfiguration } from './Configs/EnvFilePathConfig';
import { nestEnvConfiguration } from './Configs/NestEnvConfig';
import { ApplicationModule } from './Modules/ApplicationModule';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [envFilePathConfiguration()],
            load: [nestEnvConfiguration],
            isGlobal: true,
        }),
        ApplicationModule,
    ],
})
export class AppModule {}
